import mongoose from "mongoose";
const cartShema =  new mongoose.Schema({
    userId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products",
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }
        }
    ]
},{timestamps:true})
const cart = new mongoose.model("cart",cartShema)
export default cart;