import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../../models/users.js"
import { json } from "express"
const register = async(req,res)=>{
    const {userName,email,password} = req.body
  try{ 
         if(userName==''){
           return res.status(200).json({
            success:false,
            message:"Please Enter User Name"

          })
         }
         if(email==''){
            return res.status(200).json({
            success:false,
            message:"Please Enter Email "

          })
        }
         if(password==''){
          return  res.status(200).json({
            success:false,
            message:"Please Enter password "

          })
         }
         const userDetails = await User.findOne({email})
         if(userDetails){
                      return  res.status(200).json({
                            success : false,
                            message:"User Already Exists Email please try different email"
                        })
                    }
       const saltt=await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,saltt)
        const newUser = new User({
            userName,email,
            password:hashPassword
        })
        await newUser.save()
        return res.status(201).json({
            success:true,
            message:"User Created Successfully"

        })
    }
    catch(e){
        console.log(e)
       return  res.status(500).json({
            success:false,
            message:"some error"

        })
    }

}
const login = async(req,res)=>{
    const {email,password} = req.body
    try{
         if(email==''){
            return res.status(200).json({
            success:false,
            message:"Please Enter Email "

          })
        }
         if(password==''){
          return  res.status(200).json({
            success:false,
            message:"Please Enter password "

          })
         }
         const userDetails = await User.findOne({email})
         if(!userDetails){
            console.log(userDetails)
                      return  res.status(200).json({
                            success : false,
                            message:"Email Not exists"
                        })
                    }
          else{
            // salt = await bcrypt.genSalt(12)
          const passwordcompare =  await bcrypt.compare(password,userDetails.password)
          if(!passwordcompare){
            return  res.status(200).json({
                            success : false,
                            message:"Password Not Match"
                        })
              }
            else{
                const token = jwt.sign({
                    id:userDetails._id,email:userDetails.email,role:userDetails.role,userName:userDetails.userName
                },process.env.JWT_SECRET_KEY,{expiresIn:'100m'})
                // res.cookie('token',token,{httpOnly:true,secure:true}).json({
                    // success:true,
                    // message:"Login Successfully",
                    // user:{
                    //     email:userDetails.email,
                    //     role:userDetails.role,
                    //     id:userDetails._id,
                    //     userName : userDetails.userName
                    // }
                // })
                return res.status(200).json({
                      success:true,
                    message:"Login Successfully",
                    user:{
                        email:userDetails.email,
                        role:userDetails.role,
                        id:userDetails._id,
                        userName : userDetails.userName
                    },
                    token:token
                })
            }  
           
          }          
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"some error"

        })
    }

}
const logout = async(req,res)=>{
  res.clearCookie('token').json(
    {
      success:true,
      message:"logout Successfully"
    }
    
  )
}
export {register,login,logout};