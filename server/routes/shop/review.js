import express from "express"
import { addReviewForProduct,getProductReviews } from "../../controllers/shop/product-review.js"
const shopReviewRouter = express.Router()
shopReviewRouter.post("/addreview",addReviewForProduct)
shopReviewRouter.get("/getProductReviews",getProductReviews)
export default shopReviewRouter