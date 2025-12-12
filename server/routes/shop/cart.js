import express from "express"
import { addToCart,deleteCart,getCart,updateCart } from "../../controllers/shop/cart.js"
const cartRouter = express.Router()
cartRouter.post("/addCartItem",addToCart)
cartRouter.put("/updateCartItem",updateCart)
cartRouter.delete("/deleteCartItem/:userId/:productId",deleteCart)
cartRouter.get("/getCartItem/:userId",getCart)
export default cartRouter