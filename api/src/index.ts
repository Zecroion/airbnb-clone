import express, {Request, Response} from  'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import router from './routes/index'

import dotenv from 'dotenv'
dotenv.config();

const app = express();
const jwtSecret: any = process.env.JWT_SECRET;
const PORT = 4000;



app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
}));


export const getUserDataFromReq = (req: Request, res: Response) => {
  return jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
    return userData ? userData : 'ERROR';
  });
}

app.listen(PORT, ()=>{console.log('application started on port' + PORT)});
app.use('/', router())
