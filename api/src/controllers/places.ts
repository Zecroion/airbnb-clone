import mongoose from 'mongoose'
import Place from '../models/place.model'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();  
const DATABASE_URL: string = process.env.MONGO_URL as string;
const jwtSecret: any = process.env.JWT_SECRET;


export const createPlace = async (req: Request, res: Response) => {
  try {
    await mongoose.connect(DATABASE_URL);

    const { token } = req.cookies;
    const {
      title,
      address,
      addedPhotos,
      description,
      price,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;

    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err: any, userData: any) => {
        if (err) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const placeDoc = await Place.create({
          owner: userData.id,
          price,
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
        });
        res.json(placeDoc);
      });
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserPlaces = async (req: Request, res: Response) => {
    try {
      await mongoose.connect(DATABASE_URL);
  
      const { token } = req.cookies;
      if (token) {
        jwt.verify(token, jwtSecret, {}, async (err: any, userData: any) => {
          if (err) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
          }
  
          if (userData) {
            const { id } = userData;
            try {
              const places = await Place.find({ owner: id });
              res.status(200).json(places);
            } catch (err) {
              res.status(500).json({ message: 'Internal Server Error' });
            }
          } else {
            res.status(403).json({ message: 'Forbidden' });
          }
        });
      } else {
          res.status(401).json({ message: 'Not Authorized' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export const getPlace = async (req: Request, res: Response) => {
    try {
      await mongoose.connect(DATABASE_URL);
  
      const { id } = req.params;
      const placeDoc: any = await Place.findById(id);
  
      if (!placeDoc) {
        res.status(404).json({ message: 'Place not found' });
        return;
      }
  
      res.json(placeDoc);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export const updatePlace = async (req: Request, res: Response) => {
    try {
      await mongoose.connect(DATABASE_URL);
      const { token } = req.cookies;
      const {
        id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      } = req.body;
  
      jwt.verify(token, jwtSecret, {}, async (err: any, userData: any) => {
        if (err) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }
  
        const placeDoc: any = await Place.findById(id);
        if (!placeDoc) {
          res.status(404).json({ message: 'Place not found' });
          return;
        }
  
        if (userData.id === placeDoc.owner.toString()) {
          placeDoc.set({
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          });
          await placeDoc.save();
          res.json('ok');
        } else {
          res.status(403).json({ message: 'Forbidden' });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export const getPlaces = async (req: Request, res: Response) => {
    try {
      await mongoose.connect(DATABASE_URL);
  
        const places = await Place.find();
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
  };