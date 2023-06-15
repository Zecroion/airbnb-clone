import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();  
const DATABASE_URL: string = process.env.MONGO_URL as string;
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';


export const profile = async (req: Request, res: Response) => {
  mongoose.connect(DATABASE_URL);
    if (req.cookies.token) {
        const token = req.cookies.token;
        console.log(token);
        jwt.verify(token, jwtSecret, (err: any, decode: any) => {
            if (err) throw err;
            else {
                
                console.log(decode)
                const userDoc = {
                    name: decode.name,
                    email: decode.email
                };
                res.json(userDoc);
                return userDoc;
            }
        });

    }
    else {
        res.json(null);
    }
};
