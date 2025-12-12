import express from "express"
import {capturePayment, createOrder, getOrderDetails, getOrders} from "../../controllers/shop/orders.js"
const ordersRouter = express.Router()
ordersRouter.post('/create',createOrder)
ordersRouter.post('/capture',capturePayment)
ordersRouter.get('/getOrders',getOrders)
ordersRouter.get('/getOrderDetails',getOrderDetails)
export default ordersRouter