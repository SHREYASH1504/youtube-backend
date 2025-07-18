import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your cloud name
        api_key: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API key
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    

    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        //upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type: "auto"});

        // file has been uploaded successfully
        console.log("File uploaded on cloudinary successfully:", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // delete the file from local storage as the upload operation failed
        return null;
    }
}

export { uploadOnCloudinary };
