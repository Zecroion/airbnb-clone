import {useContext, useState} from "react";
import { UserContext } from "../../contexts/users.context";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";
import Places from "../places/places.component";
import { toast } from 'react-toastify'

const Profile = () => {

  const [redirect,setRedirect] = useState(null);
  const {ready,user,setUser} = useContext(UserContext);

  let {subpage} = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const logout = async() => {
    try {
      await axios.post('/logout');      
      toast('🎊 Logged out Successfuly!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (err) {
      toast.error(err.response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div className="px-4">
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="g-primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <Places />
      )}
    </div>
  );
}

export default Profile;