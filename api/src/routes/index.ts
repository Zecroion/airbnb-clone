import {Router} from 'express'
import authentication from './authentication'
import places from './places';
import profile from './profile';

const router = Router(); 
export default (): Router => {
    authentication(router);
    profile(router);
    places(router);
    return router;
}