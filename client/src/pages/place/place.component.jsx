import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../../components/booking-widget/booking-widget.component";
import PlaceGallery from "../../components/place-gallery/place-gallery.component";
import AddressLink from "../../components/address-link/address-link.component";

const Place = () => {
  const {id} = useParams();
  const [place,setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';


  return (
    <div className="max-w-[1200px] px-4 m-auto">
      <div className="mt-4 border border-black rounded-2xl mb-12 bg-gray-100 pt-8">
        <div className="mx-auto px-4">
        <h1 className="text-3xl">{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place} />
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            Check-in: {place.checkIn}<br />
            Check-out: {place.checkOut}<br />
            Max number of guests: {place.maxGuests}
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
      </div>


        

      <div className="bg-white py-8 border-t rounded-b-2xl px-4">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
      </div>
      </div>
    </div>
  );
}

export default Place;