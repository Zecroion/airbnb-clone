import { Request, Response } from 'express'
import imageDownloader from 'image-downloader'
import * as fs from 'fs'
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import dotenv from 'dotenv'
import mime from 'mime-types'
dotenv.config();

const bucket = 'hs-airbnb-clone-3'
const region = 'eu-north-1';

async function uploadToS3(path: any, originalFilename: any, mimetype: any) {
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY as string,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
  });
  const parts = originalFilename.split('.');
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + '.' + ext;
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body: fs.readFileSync(path),
    Key: 'images/' + newFilename,
    ContentType: mimetype,
  }));
  'https://hs-airbnb-clone-3.s3.eu-north-1.amazonaws.com/images/1687049708557.jpg'
  return `https://${bucket}.s3.${region}.amazonaws.com/images/${newFilename}`;
}

export const uploadByLink = async (req: Request, res: Response) => {
    const { link } = req.body;
    const newImageName = `image_${Date.now()}.jpg`;
    const imageOptions = {
      url: link,
      dest: `/tmp/${newImageName}`,
    };

  await imageDownloader.image(imageOptions);
  
    try {
      const url = await uploadToS3('/tmp/' + newImageName, newImageName, mime.lookup('/tmp/' + newImageName));
      res.json(url);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  };

  
  export const uploadFromFile = async (req: any, res: Response) => {
    try {
      const uploadedFiles:any[] = []
        for (let i = 0; i < req.files.length; i++) {
          const { path, originalname, mimetype } = req.files[i];
          const url = await uploadToS3(path, originalname, mimetype);
          uploadedFiles.push(url);
        }
        res.json(uploadedFiles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };