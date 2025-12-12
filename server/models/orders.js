import mongoose from "mongoose"
const OrderSchema = new mongoose.Schema(
    {
        userId:String,
        cartId:String,
        cartItems:[
            {
                productId:String,
                productImage:String,
                productPrice:String,
                productTitle:String,
                productQuantity:Number
            }
        ],
        addressInfo:{
            address:String,
            city:String,
            pinCode:String,
            phone:String,
            notes:String,
            addressId:  String
        },
        orderStatus:String,
        paymentMethod:String,
        paymentStatus:String,
        totalAmount:Number,
        orderCreatedDate:Date,
        orderUpdatedDate:Date,
        paymentId:String,
        payerId:String,
    }
)
 const Orders = mongoose.model('Orders',OrderSchema)
 export default Orders