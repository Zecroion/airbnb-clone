import {Router} from 'express'
import authentication from './authentication'
import places from './places';
import profile from './profile';
import photoUpload from './upload-photos';
import booking from './booking';

const router = Router(); 
export default (): Router => {
    authentication(router);
    profile(router);
    places(router);
    photoUpload(router);
    booking(router);
    return router;
}