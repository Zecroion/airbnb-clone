import mongoose from 'mongoose'
import Place from '../models/place.model'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();  
const DATABASE_URL: string = process.env.MONGO_URL as string;
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';


export const createPlace = (req: Request, res: Response) => {
  mongoose.connect(DATABASE_URL);
  const {token} = req.cookies;
  const {
    title,address,addedPhotos,description,price,
    perks,extraInfo,checkIn,checkOut,maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err: any, userData: any) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner:userData.id,price,
      title,address,photos:addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,
    });
    res.json(placeDoc);
  });
};

export const getUserPlaces = (req: Request, res: Response) => {
    mongoose.connect(DATABASE_URL);
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err: any, userData: any) => {
      const {id} = userData;
      res.json( await Place.find({owner:id}) );
    });
  };
  
  export const getPlace = async (req: Request, res: Response) => {
    mongoose.connect(DATABASE_URL);
    const {id} = req.params;
    res.json(await Place.findById(id));
  };
  
  export const updatePlace = async(req: Request,res: Response) => {
    mongoose.connect(DATABASE_URL);
    const {token} = req.cookies;
    const {
      id, title,address,addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err:any, userData: any) => {
      if (err) throw err;
      const placeDoc: any = await Place.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,address,photos:addedPhotos,description,
          perks,extraInfo,checkIn,checkOut,maxGuests,price,
        });
        await placeDoc.save();
        res.json('ok');
      }
    });
  };
  
  export const getPlaces = async(req: Request, res: Response) => {
    mongoose.connect(DATABASE_URL);
    res.json( await Place.find() );
  };