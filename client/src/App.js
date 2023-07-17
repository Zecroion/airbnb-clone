import MainHeaderLayout from './Layout/main-header.component';
import Home from './pages/home/home.component';
import Register from './pages/register/register.component';

import axios from 'axios'
import UserContextProvider from './contexts/users.context';
import Account from './pages/account/account.component';
import Places from './pages/places/places.component';
import Profile from './pages/profile/profile.component';
import PlacesForm from './pages/places-form/places-form.component';
import Place from './pages/place/place.component';
import Bookings from './pages/bookings/bookings.component';
import Booking from './pages/booking/booking.component';
import Login from './pages/login/login.component';
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom'
import './App.css';


axios.defaults.baseURL = 'https://airbnb-clone-backend-git-converts-to-js-husseinsamy.vercel.app/api';
axios.defaults.withCredentials = true;


const App = () => {
  return (
    <UserContextProvider>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<MainHeaderLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/account" element={<Account />}>
            <Route index element={<Profile />}/>
            <Route path="places" element={<Places />}/>
            <Route path="places/new" element={<PlacesForm />} />
            <Route path="places/:id" element={<PlacesForm />} />
          </Route>
          <Route path="/place/:id" element={<Place />}/>
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/bookings/:id" element={<Booking />} />
        </Route>
      </Routes>
  </UserContextProvider>
  )
}

export default App;

// New Comment From Zecroion, Pushed to new Repo



// This is a new comment, but will be pushed to the new repo, and i will try to assign it to me (Hussein, not Zecroion).


// This is a third comment, I will push it to a new branch, and i will test somethings...