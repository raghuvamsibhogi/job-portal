import mongoose from 'mongoose'
const addressSchema = new mongoose.Schema({
    userId:String,
    address:String,
    city:String,
    notes:String,
    phone:String,
    pinCode:String

},{timestamps:true}) 
const Address = mongoose.model('Address',addressSchema)
export default Address