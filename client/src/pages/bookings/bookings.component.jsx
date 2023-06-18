import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../../components/place-img/place-img.component";
import {Link} from "react-router-dom";
import BookingDates from "../../components/booking-dates/booking-dates.component";
import AccountNav from "../../components/account-nav/account-nav.component";

const Bookings = () => {

  const [bookings,setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings', {withCredentials: true}).then(response => {
      setBookings(response.data);
    });
  }, []);

    
  return (
    <>
    <AccountNav/>
       <div className="max-w-[1200px] m-auto">
          <div className="mt-4 bg-white px-4 mb-8">
            {bookings.length > 0 && bookings.map(booking => (
              <Link to={`/account/bookings/${booking._id}`} className="mt-4 border border-gray-400 bg-slate-100 flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start cursor-pointer gap-4 p-4 rounded-2xl" key={booking._id}>
                <div className="flex w-64 h-64 bg-white shrink-0 shadow-md rounded-2xl">
                  <PlaceImg place={booking.place} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl font-bold">{booking.place.title}</h2>
                  <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
                  <span className="text-2xl">
                    Total price: ${booking.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
      </div>
    </>
  );
}

export default Bookings;