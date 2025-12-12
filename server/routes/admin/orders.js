import express from "express"
import {getOrderDetails, getOrders,updateOrderStatus} from "../../controllers/admin/orders.js"
const adminOrdersRouter = express.Router()

adminOrdersRouter.get('/getOrders',getOrders)
adminOrdersRouter.get('/getOrderDetails',getOrderDetails)
adminOrdersRouter.post('/updateOrderStatus',updateOrderStatus)
export default adminOrdersRouter