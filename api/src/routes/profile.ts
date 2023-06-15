import { Router } from "express";
import { profile } from '../controllers/profile.controller';

export default (router: Router) => {
    router.get('/api/profile', profile);
}