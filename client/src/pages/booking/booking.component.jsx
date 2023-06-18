import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../../components/address-link/address-link.component";
import PlaceGallery from "../../components/place-gallery/place-gallery.component";
import BookingDates from "../../components/booking-dates/booking-dates.component";
import AccountNav from "../../components/account-nav/account-nav.component";

const Booking = () => {
  const {id} = useParams();
  const [booking,setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
      <div className="my-8 max-w-[1200px] m-auto mb-24 px-4">
        <AccountNav/>
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-slate-100 p-6 my-6 rounded-2xl flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl w-full md:w-fit mt-4 md:mt-0 flex flex-col justify-center items-center">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}

export default Booking;