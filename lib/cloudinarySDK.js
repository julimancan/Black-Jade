import { v2 as cloudinary } from 'cloudinary';


const cloudinaryConfig = cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY, // add your api_key
  api_secret: process.env.CLOUD_API_SECRET, // add your api_secret
  secure: true
});