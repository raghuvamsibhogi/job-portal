import express from 'express'
import { addAddress,updateAddress,deleteAddress,fetchAddress } from "../../controllers/shop/address.js";
const addressRouter = express.Router()
addressRouter.post('/addAddress',addAddress);
addressRouter.put('/updateAddress/:userId/:addressId',updateAddress);
addressRouter.delete('/deleteAddress/:userId/:addressId',deleteAddress);
addressRouter.get('/getAddress/:userId',fetchAddress)
export default addressRouter