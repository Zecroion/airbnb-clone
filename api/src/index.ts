import express, {Request, Response} from  'express';
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import router from './routes/index'
import dotenv from 'dotenv'

dotenv.config();
const app = express();

const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const DATABASE_URL: string = process.env.MONGO_URL as string;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));


function getUserDataFromReq(req: Request, res: Response) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get('/api/test', (req: Request, res: Response) => {
  mongoose.connect(DATABASE_URL);
  res.json('test ok');
});

app.listen(4000, ()=>{console.log('application started ')});
app.use('/', router())
