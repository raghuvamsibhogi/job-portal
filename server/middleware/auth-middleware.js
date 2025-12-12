import jwt from "jsonwebtoken"
const authMiddleware = async(req,res,next)=>{
    console.log(req.cookies)
    const token = req.cookies.token;
    console.log(token)
    if(!token){
        return res.status(401).json({
            success:false,
            message:"unathorized"
        })
    }
    try{
        const decoded = jwt.verify(token,'secret_key');
        console.log(decoded,"decoded")
        req.user = decoded
        next()
      }
    catch(e){
           return res.status(401).json({
            success:false,
            message:"unathorized"
        })
    }
}
export default authMiddleware