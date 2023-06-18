import { Router } from "express";
import { uploadByLink, uploadFromFile } from "../controllers/upload-photos.controller";
import multer from 'multer'

export default (router: Router) => {
    router.post('/api/upload-by-link', uploadByLink)
    const photosMiddleware = multer({ dest: '/tmp/' });
    router.post('/api/upload', photosMiddleware.array('photos', 100), uploadFromFile)
}