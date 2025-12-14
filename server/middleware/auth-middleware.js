import jwt from "jsonwebtoken"
// const authMiddleware = async(req,res,next)=>{
//     console.log(req.cookies)
//     const token = req.cookies.token;
//     console.log(token)
//     if(!token){
//         return res.status(401).json({
//             success:false,
//             message:"unathorized"
//         })
//     }
//     try{
//         const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
//         console.log(decoded,"decoded")
//         req.user = decoded
//         next()
//       }
//     catch(e){
//            return res.status(401).json({
//             success:false,
//             message:"unathorized"
//         })
//     }
// }
const authMiddleware = async(req,res,next)=>{
    const headers = req.headers;
    console.log(headers)
    const authorization = headers['authorization']
    const token = authorization && authorization.split(' ')[1]
    console.log(token)
    if(!token){
        return res.status(401).json({
            success:false,
            message:"unathorized"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
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