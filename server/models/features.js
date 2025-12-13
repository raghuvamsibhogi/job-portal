import mongoose from "mongoose";
const featureSchema  = new mongoose.Schema(
    {
        image:String
    },
    {
        timestamps:true
    }
)
const features =  mongoose.model('features',featureSchema)
export default features