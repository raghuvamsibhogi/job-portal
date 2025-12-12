import mongoose from "mongoose"
const productSchema= new mongoose.Schema({
     imageUrl : {
        type:String,
    
    },
     title : {
        type:String,

    },
     description : {
        type:String,

    },
     category : {
        type:String,
    },
     brand : {
        type:String,
    },
     price : {
        type:Number,
    },
     salesPrice : {
        type:Number,
    },
    totalStock:{
        type:Number
    },
    averageReview:{
        type:Number
    }
},{timestamps:true})
const products = mongoose.model('Products',productSchema)
export default products