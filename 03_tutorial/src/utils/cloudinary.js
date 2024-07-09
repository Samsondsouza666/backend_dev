import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
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

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })

        console.log("file has been uploaded successfully",reposne.url)
        return response
    }
    catch(error)
    {
        fs.unlinkSync(localFilePath)

    }
}

