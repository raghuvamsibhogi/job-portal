import express from "express"
import {connectedToDb} from "./models/database.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth/auth-route.js"
import productRouter from "./routes/admin/products-route.js"
import shopProductRouter from "./routes/shop/product-route.js"
import cartRouter from "./routes/shop/cart.js"
import addressRouter from "./routes/shop/address.js"
import ordersRouter from "./routes/shop/orders.js"
import adminOrdersRouter from "./routes/admin/orders.js"
import SearchRouter from "./routes/shop/search.js"
import shopReviewRouter from "./routes/shop/review.js"
import featureRouter from "./routes/common/feature.js"
const app = express()
connectedToDb()
const PORT = process.env.PORT||5000;
app.use(express.json())
app.use(
    cors({
      origin:"http://localhost:5173",
      allowedHeaders:[
         "Content-Type",
         "Authorization",
         "Expires",
         "pragma",
         "cache-control"

      ],
      credentials:true
    })
)
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/admin/products",productRouter)
app.use("/api/admin/orders",adminOrdersRouter)
app.use("/api/shop/products",shopProductRouter)
app.use("/api/shop/cart",cartRouter)
app.use("/api/shop/address",addressRouter)
app.use("/api/shop/orders",ordersRouter)
app.use("/api/shop/search",SearchRouter)
app.use("/api/shop/review",shopReviewRouter)
app.use("/api/common",featureRouter)

app.listen(PORT,()=>
    console.log(`server is running on port ${PORT}`))





