const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

/*
Get all bookings of current user
*/

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const getBookings = await Booking.findAll({
        where: {
            userId: user.id
        }
    })

    console.log(getBookings)
})

/*
Edit a Booking
*/
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { user } = req;
    const getBookingId = req.params.bookingId
    const getBooking = await Booking.findByPk(getBookingId)

    const startDateTime = new Date(startDate).getTime()
    const endDateTime = new Date(endDate).getTime()
    const today = new Date().getTime()

    if (getBooking.length === 0) {
        res.statusCode = 404;
        return res.json({
            message: `Booking couldn't be found`
        })
    }

    if (user.id !== getBooking.ownerId) {
        res.statusCode = 404;
        return res.json({
            message: 'Authentication Error'
        })
    }

    if (today > startDateTime || today > endDateTime) {
        res.statusCode = 403;
        return res.json({
            message: `Past bookings can't be modified`
        })
    }

    if (endDateTime < startDateTime) {
        res.statusCode = 400;
        return res.json({
            message: "endDate cannot come before startDate"
        })
    }
    let newArr = []
    getBooking.forEach(booking => {
        newArr.push(booking.toJSON())
    })

    let bookedStartDate
    let bookedStartDateTime
    let bookedEndDate
    let bookedEndDateTime

    let errorObjConflicts = {}

    newArr.forEach(ele => {
        bookedStartDate = new Date(ele.startDate)
        bookedStartDateTime = bookedStartDate.getTime()
        bookedEndDate = new Date(ele.endDate)
        bookedEndDateTime = bookedEndDate.getTime()

        if (startDateTime < bookedStartDateTime && endDateTime > bookedStartDateTime) {
            errorObjConflicts.message = `Sorry, this spot is already booked for the specified dates`
            errorObjConflicts.errors.endDate = "End date conflicts with an existing booking"
        }
        if (startDateTime > bookedStartDateTime && startDateTime < bookedEndDateTime) {
            errorObjConflicts.message = `Sorry, this spot is already booked for the specified dates`;
            errorObjConflicts.errors.startDate = `Start date conflicts with an existing booking`
        }

        if (bookedStartDateTime > startDateTime && endDateTime > bookedEndDateTime) {
            errorObjConflicts.message = `Sorry, this spot is already booked for the specified dates`;
            errorObjConflicts.errors.startDate = `Start date conflicts with an existing booking`
            errorObjConflicts.errors.endDate = "End date conflicts with an existing booking"
        }
    })

    if (Object.keys(errorObjConflicts).length > 0) {
        res.statusCode = 403;
        return res.json(errorObjConflicts)
    }

    res.json(getBooking)
})

/*
Delete a Booking
*/
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const getBookingId = req.params.bookingId;
    const { user } = req;
    const today = new Date().getTime()
    const getBooking = await Booking.findByPk(getBookingId)
    const getSpot = await Spot.findByPk(user.id)

    let bookingStart = getBooking.startDate.getTime()
    let bookingEnd = getBooking.endDate.getTime()

    if (user.id !== getSpot.userId || getBooking.ownerId !== user.id) {
        res.statusCode = 404;
        return res.json({
            message: `Authentication required`
        })
    }

    if (getBooking.length === 0) {
        res.statusCode = 404;
        return res.json({
            message: `Booking can't be found`
        })
    }

    if (bookingStart <= today) {
        res.statusCode = 403;
        return res.json({
            message: `Bookings that have been started can't be deleted`
        })
    }

    await getBooking.destroy()
    res.statusCode = 200;
    res.json({
        message: `Successfully deleted`
    })


})




/*
Add Query Filters to Get All Spots

*/


module.exports = router;
