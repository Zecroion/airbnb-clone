import express, {Request, Response} from  'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import router from './routes/index'
const app = express();
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
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
