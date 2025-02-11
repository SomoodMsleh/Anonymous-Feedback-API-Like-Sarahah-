import { v2 as cloudinary } from 'cloudinary';
// Storing the filename in the database and saving the file on an external server (e.g., S3, DigitalOcean Spaces, or CDN)
// cloudinary
cloudinary.config({ 
    cloud_name: '', 
    api_key: '', 
    api_secret: '' // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;