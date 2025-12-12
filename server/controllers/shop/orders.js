import Orders from "../../models/orders.js";
import client from "../../helpers/paypal-helper.js";
import paypal from "@paypal/checkout-server-sdk"; 
import cart from "../../models/cart.js";
import products from "../../models/products-model.js";  
// const createOrder = async(req,res)=>{
//     try{
//        const {
//         userId,
//         cartItems,
//         addressInfo,
//         orderStatus,
//         paymentMethod,
//         paymentStatus,
//         totalAmount,
//         orderCreatedDate,
//         orderUpdatedDate,
//         paymentId,
//         payerId}=req.body
//         const create_payment_json = {
//             intent:'sale',
//             payer:{
//                 payment_method:'paypal'
//             },
//             redirect_urls:{
//                     return_url:'http://localhost:5173/shop/paypal-return',
//                     cancel_url:'http://localhost:5173/shop/paypal-cancel'
//             },
//             transactions:[
//                 {
//                     item_list:{
//                         items:cartItems.map(item=>({
//                             name:item.productTitle,
//                             sku:item.productId,
//                             price:item.productPrice.toFixed(2),
//                             currency:"USD",
//                             quantity:item.productQuantity

//                         }))

                        
//                     },
//                     amount:{
//                         currency:'USD',
//                         total:totalAmount
//                     },
//                     description:'description'
//                 }
//             ]

            
//         }
//         paypal.payment.create(create_payment_json,async(error,paymentInfo)=>{
//            if(error){
//             console.log(error)
//             return res.status(500).json({
//                 success:0,
//                 message:'some error occured while create payment'
//             })
//            }
//            else{
//             const newlyCreatedOrder = new Orders({
//                  userId,
//                 cartItems,
//                 addressInfo,
//                 orderStatus,
//                 paymentMethod,
//                 paymentStatus,
//                 totalAmount,
//                 orderCreatedDate,
//                 orderUpdatedDate,
//                 paymentId,
//                 payerId
//             })
//             await newlyCreatedOrder.save()
//             const approval_url = paymentId.links.find(link=>link.rel==='approval_url').href
//             return res.status(201).json({
//                 success:1,
//                 message:'order created successfully',
//                 apporvalUrl:approval_url,
//                 orderId:newlyCreatedOrder._id
//             })
//            }
//         })
//     }
    
//     catch(error){
//         console.log('order error',error)
//        return res.status(500).json(
//             {
//               success:0,
//               message:'Some Error'
//             }
//         )
//     }
// }
const createOrder = async (req, res) => {
  try {
    const {
      cartId,
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderCreatedDate,
      orderUpdatedDate,
    } = req.body;
     for(let item of cartItems){
      let product = await products.findById(item.productId)
      if(item.productQuantity>product.totalStock){
        return res.status(200).json({
          success:0,
          message:`Not Enough Stock Available for this product ${item.productTitle}`
        })
      }
     }
    // Build PayPal Order Request
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalAmount.toFixed(2),
              },
            },
          },
          items: cartItems.map((item) => ({
            name: item.productTitle,
            sku: item.productId,
            quantity: item.productQuantity.toString(),
            unit_amount: {
              currency_code: "USD",
              value: item.productPrice.toFixed(2),
            },
          })),
        },
      ],
      application_context: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
    });

    // 🚀 TRY to create PayPal Order
    const order = await client.execute(request);

    // ❗ If PayPal did NOT respond with an ID → error
    if (!order || !order.result || !order.result.id) {
      return res.status(500).json({
        success: 0,
        message: "PayPal failed to create order",
      });
    }

    // Save order in database
    const newlyCreatedOrder = new Orders({
      cartId,
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderCreatedDate,
      orderUpdatedDate,
      paymentId: order.result.id,
    });

    await newlyCreatedOrder.save();

    // Extract Approval URL
    const approvalUrl = order.result.links.find(
      (link) => link.rel === "approve"
    )?.href;

    if (!approvalUrl) {
      return res.status(500).json({
        success: 0,
        message: "Unable to find PayPal approval link",
      });
    }

    // SUCCESS RESPONSE
    return res.status(201).json({
      success: 1,
      message: "Order created successfully",
      approvalUrl,
      orderId: newlyCreatedOrder._id,
    });
  } catch (error) {
    // ❌ ERROR BLOCK
    console.log("PayPal Order Error:", error);

    return res.status(500).json({
      success: 0,
      message: "Some error occurred while creating payment",
      error: error.message || error,
    });
  }
};

const capturePayment = async(req,res)=>{
    try{
      const{paymentId,payerId,orderId}=req.body
      const order_details = await Orders.findById(orderId)
      if(!order_details){
        return res.status(400).json({
          success:0,
          message:'Order Not Found'
        })
      }
      const update_order = await Orders.findOneAndUpdate({_id:orderId},{paymentId:paymentId,payerId:payerId,paymentStatus:'paid',orderStatus:'confirmed'},{new:true})
      await cart.findByIdAndDelete(order_details.cartId)
      await updateProductStock(order_details.cartItems)
      return res.status(200).json({
        success:1,
        message:'order confirmed',
        data:update_order
      })
    }
    catch(error){
        console.log('capture error',error)
       return res.status(500).json(
            {
              success:0,
              message:'Some Error'
            }
        )
    }
}
const getOrders = async(req,res)=>{
  try{
    const {userId} = req.query
   const orders = await Orders.find({userId:userId})
   if(!orders){
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
async function updateProductStock(cartItems) {
  for (const item of cartItems) {
    await products.updateOne(
      { _id: item.productId },
      { $inc: { totalStock: -item.productQuantity } }
    );
  }
}
export  {createOrder,capturePayment,getOrders,getOrderDetails}