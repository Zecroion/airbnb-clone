import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Booking from '../models/booking.model';
import { getUserDataFromReq } from '../index';
import dotenv from 'dotenv'

dotenv.config();
const DATABASE_URL: string = process.env.MONGO_URL as string;

export const createBooking = async (req: Request, res: Response) => {
    mongoose.connect(DATABASE_URL);
    const userData: any = getUserDataFromReq(req, res);
    const {
      place,checkIn,checkOut,numberOfGuests,name,phone,price,
    } = req.body;
    if (userData === 'ERROR') {
        res.status(401).json({code:401, message: 'Not Authorized'})
        return;
    }
    try {
        try {
            const doc = await Booking.create({
                place,checkIn,checkOut,numberOfGuests,name,phone,price,
                user:userData.id,
                })
            res.status(200).json(doc)
        } catch (err:any) { 
            res.status(422).json(err);
        }
    } catch (err:any) {
      res.status(500).json('Something went wrong, please try again later!')
    }
    
  };
  
  
  
export const getBooking = async (req: Request, res: Response) => {
    mongoose.connect(DATABASE_URL);
    try {
        const userData: any = await getUserDataFromReq(req,res);
        res.status(200).json( await Booking.find({user:userData.id}).populate('place') );
    }
    catch (err) {
        res.status(500).json('Something went wrong, please try again later!')
    }
};