import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();  
const DATABASE_URL: string = process.env.MONGO_URL as string;
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';


export const profile = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ code: 401, message: 'Unauthorized' });
      }
  
      const decodedToken: any = jwt.verify(token, jwtSecret);
      const userDoc = {
        name: decodedToken.name,
        email: decodedToken.email
      };
      return res.json(userDoc);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
