import { Link } from "react-router-dom";
import AccountNav from "../../components/account-nav/account-nav.component";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../../components/place-img/place-img.component";
import PerksOfPlace from "../../components/perks-of-place/perks-of-place";

const Places = () => {

    const [places, setPlaces] = useState([]);

    useEffect(() => { 
        axios.get("/user-places").then(({data}) => {
            setPlaces(data);
        });
    }, [])



    return (
        <div className="max-w-[1200px] m-auto">
          <div className="text-center">
            <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
              Add new place
            </Link>
          </div>
          <div className="mt-4 bg-white px-4 mb-8">
            {places.length > 0 && places.map(place => (
              <Link to={'/account/places/'+place._id} className="mt-4 border border-black flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start cursor-pointer gap-4 bg-white p-4 rounded-2xl" key={place._id}>
                <div className="flex w-64 h-64 bg-white shrink-0 shadow-md rounded-2xl">
                  <PlaceImg place={place} />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl font-bold">{place.title}</h2>
                  <p className="text-sm mt-2 font-base">{place.description}</p>
                  <PerksOfPlace selected={place.perks}/>
                </div>
              </Link>
            ))}
          </div>
      </div>
    )
}

export default Places;