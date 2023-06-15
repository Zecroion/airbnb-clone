import { Router } from "express";
import { createPlace, getUserPlaces, getPlace, updatePlace, getPlaces} from '../controllers/places';

export default (router: Router) => {
    router.post('/api/places', createPlace);
    router.put('/api/places', updatePlace);
    router.get('/api/places', getPlaces);
    router.get('/api/places/:id', getPlace);
    router.get('/api/user-places', getUserPlaces);
}