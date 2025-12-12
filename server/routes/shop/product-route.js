import express from "express"
import { getProducts,getProductDetails } from "../../controllers/shop/products.js"
const shopProductRouter = express.Router()
shopProductRouter.get("/fetchProducts",getProducts)
shopProductRouter.get("/getProductsDetails/:id",getProductDetails)
export default shopProductRouter