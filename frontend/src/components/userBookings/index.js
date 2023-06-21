import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserBookingsThunk } from "../../store/bookings"
import { useHistory } from "react-router-dom/cjs/react-router-dom"


function UserBookings() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const bookings = useSelector(state => state.bookings)
    const bookingsArray = Object.values(bookings)
    console.log(bookingsArray)

    useEffect(() => {
        dispatch(getUserBookingsThunk(user.id))
    }, [dispatch])

    function handleEdit(bookingId){
        console.log('edit booking', bookingId)
    }
    function handleDelete(bookingId){
        console.log('delete booking modal', bookingId)
    }
    if(!bookings) return <p>You don't have any bookings</p>
    return (
        <>
            <h1>User Bookings</h1>
            {bookingsArray.map(booking =>
                <div className="bookingSpotCard" title={`${booking.Spot.name}`}>
                    <img src={`${booking.Spot.previewImage}`}></img>
                    <p>${`${booking.Spot.price}`}</p>
                    <button onClick={() => handleEdit(booking.id)}>Edit Booking</button>
                    <button onClick={() => handleDelete(booking.id)}>Delete Booking</button>
                </div>
                )}
        </>
    )
}

export default UserBookings