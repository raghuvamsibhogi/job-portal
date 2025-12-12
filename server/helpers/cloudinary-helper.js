import multer from "multer"
import cloudinary from "../config/cloudinary-config.js"
const storage = new multer.memoryStorage()
const uploadFile = async(filePath)=>{
    try{
    const uploadResult = await cloudinary.uploader.upload(filePath)
        return uploadResult
    }

    catch(e){
        console.log(e)
        console.error("Error while uploading image to cloudinary")
    }
}
const upload = multer({storage})
export {uploadFile,upload}