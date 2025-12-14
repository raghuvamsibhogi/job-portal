import mongoose from "mongoose"
const connectedToDb=async()=>{
    try{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("db Connected Successfully")
    })
    .catch((error)=>{
        console.log(error)
    })
}
    catch{
        console.log("something went wrong")
        process.exit(1)
    }
}
export { connectedToDb }
