import features from "../../models/features.js";
const saveImage = async(req,res)=>{
    try{
        const {image} = req.body
        const newImage = await features.create({
            image:image
        })
        return res.status(200).json({
            success:1,
            message:"Image Saved Successfully",
            data:newImage
        })
    }
    catch(error){
               return res.status(500).json({
            success:0,
            message:"Erro while saving image"
        })
    }
}
const getFeatureImages = async(req,res)=>{
    try{
        const newImages = await features.find()
        if(newImages.length==0){
            return res.status(200).json({
            success:0,
            message:"No Images Found"
        })
        }
        return res.status(200).json({
            success:1,
            message:"Images Found",
            data:newImages
        })
    }
    catch(error){
               return res.status(500).json({
            success:0,
            message:"Erro while saving image"
        })
    }
}
export {saveImage,getFeatureImages}