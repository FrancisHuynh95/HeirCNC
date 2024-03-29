import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { createBookingThunk, getBookingThunk } from "../../store/bookings"
import './bookSpot.css'

function BookSpot({ spot }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const bookings = useSelector(state => state.bookings)
    const bookingsArray = Object.values(bookings)
    const [errors, setErrors] = useState({})
    const errorObj = {}
    const user = useSelector(state => state.session.user)


    function bookingsStuff() {
        if (bookingsArray.length > 0) {
                bookingsArray.forEach(booking => {
                const bookingStart = new Date(booking.startDate)
                const bookingEnd = new Date(booking.endDate)
                const newStart = new Date(startDate)
                const newEnd = new Date(endDate)

                const bookingStartTime = bookingStart.getTime()
                const bookingEndTime = bookingEnd.getTime()
                const newStartTime = newStart.getTime()
                const newEndTime = newEnd.getTime()

                if (
                    (newStartTime < bookingStartTime && newEndTime > bookingStartTime) ||
                    (newStartTime > bookingStartTime && newStartTime < bookingEndTime) ||
                    (bookingStartTime > newStartTime && newEndTime > bookingEndTime)
                ) return false;
                else {
                    return true
                }
            })
        } else {
            const newStart = new Date(startDate)
            const newEnd = new Date(endDate)

            const newStartTime = newStart.getTime()
            const newEndTime = newEnd.getTime()

            if (newEndTime <= newStartTime) {
                return false;
            } else {
                return true
            }
        }
    }


    const today2 = Date.now()
    const today = new Date(today2).toISOString().split("T")[0];
    const newStart = new Date(startDate)
    const newEnd = new Date(endDate)

    const newStartTime = newStart.getTime()


    async function handleSubmit(e) {
        let submitErrors = {}
        e.preventDefault()
        if (bookingsStuff === false) {
            submitErrors.dates = "This date range is not available"
        }
        setErrors(submitErrors);
        if (Object.values(submitErrors).length > 0) {
            return
        } else {
            let err
            const booking = { "startDate": startDate, "endDate": endDate, "spotId": spot.id }
            try {
                await dispatch(createBookingThunk(+spot.id, booking))
            } catch (e) {
                // console.log('catchhcvhch')
                err = await e.json()
                setErrors(err.errors)
            }
            if(err === undefined){
                closeModal()
            }
                // console.log(errors)
        }
    }

    return user ? (
        <div className="BookSpotModal">
            {user.id !== spot.ownerId ?
                <>
                    <h1>Book Your Spot</h1>
                    {Object.values(errors).map(error =>
                        <p className="errors">{error}</p>
                    )}
                    <form className="datesInput" onSubmit={handleSubmit}>
                        <label>
                            Start : <input
                                type="date"
                                onChange={(e) => setStartDate(e.target.value)}
                                value={startDate}
                                min={today}
                            ></input>
                        </label>
                        <label>
                            End : <input
                                type="date"
                                onChange={(e) => setEndDate(e.target.value)}
                                value={endDate}
                                min={today < startDate ? startDate : today}
                            ></input>
                        </label>
                        <div className="createBookingButtonContainer">
                            <button className="createBookingButton" type="submit">Submit</button>
                        </div>
                    </form>
                </>
                : <h1>An owner cannot book their own spot</h1>}
        </div>

    ) : <h1 className="BookSpotModal">Please log in to continue</h1>
}

export default BookSpot
