import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';
import dotenv from 'dotenv'

dotenv.config();  
const DATABASE_URL: string = process.env.MONGO_URL as string;
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';



const createUser = async (name: string, email: string, password: string) => {
  const userDoc = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  return userDoc;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userDoc = await createUser(name, email, password);
    res.json(userDoc);
  } catch (error:any) {
    res.status(422).json({ message: error.message });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(422).json('User not found');
    }
    const passOk = bcrypt.compareSync(password, userDoc.password as string);
    if (!passOk) {
      return res.status(422).json('Incorrect password');
    }
    const token = jwt.sign({
      email: userDoc.email,
      name: userDoc.name,
      id: userDoc._id
    }, jwtSecret, {});
    res.cookie('token', token).json(userDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json('Something went wrong, please try again later!');
  }
};
  

export const logout = (req: Request, res: Response) => {
    res.cookie('token', '').json(true);
};