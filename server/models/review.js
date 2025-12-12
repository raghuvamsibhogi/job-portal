import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    productId:String,
    reviewMessage:String,
    reviewValue:Number,
    userId:String,
    userName:String
},{timestamps:true})
const reviews = mongoose.model('reviews',reviewSchema)
export default reviews