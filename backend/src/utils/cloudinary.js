import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"; //filesystem

//we first get the uploaded file into our own server and then upload on cloudinary from our server

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath) => {
    try{
        if(!localFilePath)return null
        //else upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })
        // file uploaded successfully
        console.log("File is updated on cloudinary",response.url);
        return response;
    }catch(error){
        fs.unlinkSync(localFilePath); //removes the locally save temporary file as the file couldnt be uploaded
        return null;
    }
}

export {uploadOnCloudinary}