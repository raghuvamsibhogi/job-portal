import mongoose from "mongoose"
const connectedToDb=async()=>{
    try{
    mongoose.connect("mongodb+srv://raghuvamsibhogi2025:raghuvamsibhogi2025@cluster0.kbpckie.mongodb.net/")
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
