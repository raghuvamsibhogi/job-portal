import Orders from "../../models/orders.js";
import reviews from "../../models/review.js";
import products from "../../models/products-model.js";
const addReviewForProduct = async(req,res)=>{
    try{
       const {userId,userName,reviewMessage,reviewValue,productId} = req.body
       if(!userId||!userName ||!reviewMessage||!reviewValue||!productId)
        {
                return res.status(400).json
                (
                    {
                        success:0,
                        message:'Invalid Data'
                    }
                )
        }
    const order = await Orders.find({userId:userId,orderStatus:'confirmed'});
         if(order.length==0)
            {
                return res.status(200).json
                (
                        {
                            success:0,
                            message:'You need to purchase the product to review it'
                        }
                )
            }
            else{
                const exists = order.some(orderItem =>
                        orderItem.cartItems.some(item => item.productId == productId)
                    );
                if(!exists){
                     return res.status(200).json
                (
                        {
                            success:0,
                            message:'You need to purchase the product to review it'
                        }
                )
                }
            }
    const checkExistingReview = await reviews.find({userId:userId,productId:productId})  
    if(checkExistingReview.length>0)
        {
           return res.status(200).json
           (
                {
                    success:0,
                    message:'You have Already reviewed this product'
                }
            )
        }
         const newReview = await reviews.create({
                               userId:userId,
                               productId:productId,
                               reviewMessage:reviewMessage,
                               reviewValue:reviewValue,
                               userName:userName
                             })
          const Productreviews = await reviews.find({productId:productId}) 
          const reviewsLength =  Productreviews.length
          const averageReview = Productreviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/reviewsLength
          await products.findByIdAndUpdate(productId,{averageReview:averageReview})
         return res.status(200).json
           (
                {
                    success:1,
                    message:'Review Added Successfully for the product'
                }
            )                    
    }
   
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:0,
            message:'Some Review Error'
        })
    }
    
}
const getProductReviews = async(req,res)=>{
    try{
       const{productId} = req.query
       if(!productId){
         return res.status(200).json({
            success:0,
            message:'Please enter Product Id'
        })
    } 
        const prodcutReviews = await reviews.find({productId:productId})
           return res.status(200).json({
            success:0,
            message:'Please reviews fetched Successfully',
            data:prodcutReviews
        })
       
    }
     catch(error){
        return res.status(500).json({
            success:0,
            message:'Some Review Error while fetching'
        })
    }
}
export {addReviewForProduct,getProductReviews}