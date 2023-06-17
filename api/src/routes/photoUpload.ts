import { Router } from "express";
import { uploadByLink, uploadFromFile } from "../controllers/upload-photos.controller";
import multer from 'multer'

export default (router: Router) => {
    router.post('/api/upload-by-link', uploadByLink)
    const photosMiddleware = multer({ dest: 'E:/Hussein/Work/Programming/WebDevelopment/2023/React.js course/airbnb-clone/api/src/uploads/' });
    router.post('/api/upload', photosMiddleware.array('photos', 100), uploadFromFile)
}