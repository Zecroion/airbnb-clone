import { Request, Response } from 'express'
import imageDownloader from 'image-downloader'
import * as fs from 'fs'
export const uploadByLink = async (req: Request, res: Response) => {
    const { link } = req.body;
    const newImageName = `image_${Date.now()}.jpg`;
    const imageOptions = {
      url: link,
      dest: `E:/Hussein/Work/Programming/WebDevelopment/2023/React.js course/airbnb-clone/api/src/uploads/${newImageName}`,
    };
  
    try {
      await imageDownloader.image(imageOptions);
      res.json(newImageName);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  };
  export const uploadFromFile = (req: any, res: Response) => {
    try {
      const uploadedFiles = req.files.map((file: Express.Multer.File) => {
        const { path, originalname } = file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = `${path}.${ext}`;
        fs.renameSync(path, newPath);
        return newPath.replace('E:\\Hussein\\Work\\Programming\\WebDevelopment\\2023\\React.js course\\airbnb-clone\\api\\src\\uploads\\', '');
      });
      res.json(uploadedFiles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };