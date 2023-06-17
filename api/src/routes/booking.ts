import { Router } from 'express'
import { createBooking, getBooking } from '../controllers/bookings.controller';

export default (router: Router) => {
    router.post('/api/bookings', createBooking);
    router.get('/api/bookings', getBooking);
 
}