import Orders from "../../models/orders.js";

const getOrders = async(req,res)=>{
  try{
    let {page,limit} = req.query 
    let skip = (page-1)*limit
    console.log(skip)
  //  const orders = await Orders.find()
    const orders = await Orders.aggregate([
   { $match: {} },  // no filter, get all orders
      // {
      //   $lookup: {
      //     from: "user",         // correct collection name
      //     localField: "userId",  // Orders.userId
      //     foreignField: "_id",   // Users._id
      //     as: "user"
      //   }
      // },
      {
        $lookup: {
          from: "users",
          let: { uid: { $toObjectId: "$userId" } }, // convert string to ObjectId
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$uid"] }
              }
            }
          ],
          as: "user"
        }
      },
  { $unwind: "$user" },
  { $skip: skip },
  { $limit: 2 },
]);
const totalRecords = await Orders.countDocuments()
console.log(orders)
   if(orders.length==0){
     return res.status(400).json(
            {
              success:0,
              message:'Orders Data Not found'
            }
        )
   }
   return res.status(201).json(
            {
              success:1,
              message:'Orders Data  found',
              data:orders,
              totalRecords:totalRecords
            }
        )

  }
  catch(error){
      console.log('listing error',error)
       return res.status(500).json(
            {
              success:0,
              message:'Some Error'
            }
        )
  }
  
}
const getOrderDetails = async(req,res)=>{
  try{
    const {orderId} = req.query
   const orders = await Orders.findById(orderId)
   if(!orders){
     return res.status(400).json(
            {
              success:0,
              message:'Orders Details Not found'
             
            }
        )
   }
   return res.status(201).json(
            {
              success:1,
              message:'Orders Details  found',
               data:orders
            }
        )

  }
  catch(error){
      console.log('listing error',error)
       return res.status(500).json(
            {
              success:0,
              message:'Some Error'
            }
        )
  }
  
}
const updateOrderStatus = async(req,res)=>{
  try{
    const {orderId,orderStatus} = req.body
   const orders = await Orders.findByIdAndUpdate({_id:orderId},{orderStatus:orderStatus},{new:true})
   if(!orders){
     return res.status(400).json(
            {
              success:0,
              message:'Orders Details Not found'
             
            }
        )
   }
   return res.status(201).json(
            {
              success:1,
              message:'Orders Details  found',
               data:orders
            }
        )

  }
  catch(error){
      console.log('listing error',error)
       return res.status(500).json(
            {
              success:0,
              message:'Some Error'
            }
        )
  }
  
}
export  {getOrders,getOrderDetails,updateOrderStatus}