import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();
// Storing the filename in the database and saving the file on an external server (e.g., S3, DigitalOcean Spaces, or CDN)
// cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;