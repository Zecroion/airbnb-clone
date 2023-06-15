import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();  
const DATABASE_URL: string = process.env.MONGO_URL as string;
console.log(DATABASE_URL)
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';


export const register = async (req: Request, res: Response) => {
  mongoose.connect(DATABASE_URL);
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
};

export const login = async (req: Request, res: Response) => {
    mongoose.connect(DATABASE_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password as string);
      if (passOk) {
        jwt.sign({
          email: userDoc.email,
          name: userDoc.name,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  };

  

export const logout = (req: Request, res: Response) => {
    res.cookie('token', '').json(true);
};