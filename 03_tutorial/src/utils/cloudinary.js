import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import path from "path"
// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath)=>{
    try
    {
        if(!localFilePath)  return null

        const response = await cloudinary.uploader.upload(localFilePath)
        fs.unlinkSync(localFilePath)
        return response
        
        console.log("file has been uploaded successfully",reposne.url)

    }
    catch(error)
    {
        // console.log( await cloudinary.uploader.upload(localFilePath))
        fs.unlinkSync(localFilePath)

    }
}

export {uploadOnCloudinary}

