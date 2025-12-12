import express from "express";
import   { login, logout, register }     from "../../controllers/auth/auth-controller.js"
import authMiddleware from "../../middleware/auth-middleware.js";
const route = express.Router()
route.post('/register',register)
route.post('/login',login)
route.post('/logout',logout)
route.get('/check-auth',authMiddleware,(req,res)=>{
    console.log(req.user)
   const userDetails = req.user
    res.status(200).json({
        success:true,
        message:"Authenicated User",
        user:userDetails
    })
})
export default route