import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Image from "../../components/image/image.jsx";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  const [places,setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    
    <div className="mt-8 grid gap-x-4 gap-y-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 max-w-[1200px] m-auto">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} className="rounded-2xl p-2 md:p-0 shadow-lg md:shadow-none md:border-none border border-gray-200" key={place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold ">{place.title}</h2>
          <h3 className="text-sm text-gray-500">{place.address}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;