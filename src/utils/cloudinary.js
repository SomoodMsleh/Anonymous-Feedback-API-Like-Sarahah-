import { v2 as cloudinary } from 'cloudinary';
// Storing the filename in the database and saving the file on an external server (e.g., S3, DigitalOcean Spaces, or CDN)
// cloudinary
cloudinary.config({ 
    cloud_name: 'ddooa7ive', 
    api_key: '686489392124457', 
    api_secret: '5T_XLOOHGQaeLzR_3nJETMu1URg' // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;