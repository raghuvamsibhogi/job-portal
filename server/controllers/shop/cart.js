import cart from "../../models/cart.js"
import products from "../../models/products-model.js"
const addToCart = async(req,res)=>{
    try{
       const {userId,productId,quantity} = req.body
       if(!userId || !productId || quantity<=0){
        return res.status(404).json({
            success:0,
            message:"Invalid Data"
        })
       }
       const Product_details =await products.findById(productId)
       if(!Product_details){
         return res.status(404).json({
            success:0,
            message:"product details not found"
        })
       }
       let cartdetails = await cart.findOne({userId})
       if(!cartdetails){
          cartdetails = new cart({userId,items:[]})
       }
       
       const findIndexOfCurrentProduct = cartdetails.items.findIndex(item=>item.productId.toString()===productId)
       if(findIndexOfCurrentProduct===-1){
        cartdetails.items.push({productId,quantity})
        const itemQuantity = quantity
          const isProductQuantityAvailable = await checkQuantity(productId,itemQuantity)
       if(!isProductQuantityAvailable){
        return res.status(200).json(
            {
                success:0,
                message:`only ${Product_details.totalStock} quantity can be added for this porduct`
            }
        )
       }
       }
       else{
        cartdetails.items[findIndexOfCurrentProduct].quantity+=quantity
        const itemQuantity = cartdetails.items[findIndexOfCurrentProduct].quantity
          const isProductQuantityAvailable = await checkQuantity(productId,itemQuantity)
       if(!isProductQuantityAvailable){
         cartdetails.items[findIndexOfCurrentProduct].quantity-=quantity
        return res.status(200).json(
            {
                success:0,
                // message:"Quantity Exceeds Product total stock",
                message:`only ${Product_details.totalStock} quantity can be added for this item`,
                data:cartdetails
                
            }
        )
       }
       }
     
      const saved_cartDetails = await cartdetails.save()
      if(saved_cartDetails){
        return res.status(200).json({
            success:1,
            message:"cart added Succefully",
            data:saved_cartDetails
        })
      }
      else{
         return res.status(404).json({
            success:0,
            message:"some error while adding product"
        })
      }
    }catch(error){
        console.log("cart error",error)
        return res.status(500).json({
            success:0,
            message:"some cart error"
        })
    }
}
const updateCart = async(req,res)=>{
    try{
        const {userId,productId,quantity} = req.body
       if(!userId || !productId || quantity<=0){
        return res.status(404).json({
            success:0,
            message:"Invalid Data"
        })
       }
       var cart_details = await cart.findOne({userId})
       if(!cart_details){
           return res.status(404).json({
            success:0,
            message:"cart not found"
        })
       }
       const isProductQuantityAvailable = await checkQuantity(productId,quantity)
       if(!isProductQuantityAvailable){
         await cart_details.populate({
            path:"items.productId",
            select:'imageUrl title salesPrice price totalStock'
         })
            const updatedCartItmems = cart_details.items.map(item=>({
            productId:item.productId? item.productId._id:null,
            imageUrl:item.productId ? item.productId.imageUrl:null,
            title:item.productId?item.productId.title:null,
            price:item.productId?productId.price:null,
            salesPrice:item.productId?item.productId.salesPrice:null,
            totalStock:item.productId?item.productId.totalStock:null,
            quantity:item.quantity
        }))
        const product_details = await products.findById(productId)
        return res.status(200).json(
            {
                success:0,
                // meesage:"quantity Exceeds Product total stock",
                message:`only ${product_details.totalStock} quantity can be added for this item`,
                    data:{
            ...cart_details._doc,
            items:updatedCartItmems
        }
            }
        )
       }
       const findIndexOfCurrentProduct = cart_details.items.findIndex(item=>item.productId.toString()===productId)
         if(findIndexOfCurrentProduct===-1){
                return res.status(404).json({
            success:0,
            message:"product not found in cart"
        })
         }
         cart_details.items[findIndexOfCurrentProduct].quantity=quantity
         cart_details = await cart_details.save()
         await cart_details.populate({
            path:"items.productId",
            select:'imageUrl title salesPrice price totalStock'
         })
            const updatedCartItmems = cart_details.items.map(item=>({
            productId:item.productId? item.productId._id:null,
            imageUrl:item.productId ? item.productId.imageUrl:null,
            title:item.productId?item.productId.title:null,
            price:item.productId?productId.price:null,
            salesPrice:item.productId?item.productId.salesPrice:null,
            totalStock:item.productId?item.productId.totalStock:null,
            quantity:item.quantity
        }))
          return res.status(200).json({
            success:1,
            message:"cart updated Succefully",
             data:{
            ...cart_details._doc,
            items:updatedCartItmems
        }
        })
    }catch(error){
        console.log("cart error",error)
        return res.status(500).json({
            success:0,
            message:"some cart error"
        })
    }
}
const getCart = async(req,res)=>{
    try{
       const {userId} = req.params
       if(!userId){
         return res.status(404).json({
            success:0,
            message:"user id mandatory !..."
        })
       }
       const cartDetails = await cart.findOne({userId}).populate({
        path:'items.productId',
        select:'imageUrl title salesPrice price totalStock'
       })
       if(!cartDetails){
        return res.status(404).json({
            success:0,
            message:"cart not found !..."
        })
    }
    console.log(cartDetails)
        const validateItems = cartDetails.items.filter(productItem=>productItem.productId)
        console.log(validateItems)
        if(validateItems.length < cartDetails.length){
            cartDetails.items = validateItems
            await cartDetails.save()
        }
        const populateCartItmems = validateItems.map(item=>({
            productId:item.productId._id,
            imageUrl:item.productId.imageUrl,
            title:item.productId.title,
            price:item.productId.price,
            salesPrice:item.productId.salesPrice,
            quantity:item.quantity,
            totalStock:item.productId.totalStock
        }))
        console.log(populateCartItmems)
       return res.status(200).json({
        success:1,
        data:{
            ...cartDetails._doc,
            items:populateCartItmems
        }
    })
    }catch(error){
        console.log("cart error",error)
        return res.status(500).json({
            success:0,
            message:"some cart error"
        })
    }
}
const deleteCart = async(req,res)=>{
    try{
        const {userId,productId} = req.params
        if(!userId || !productId){
        return res.status(404).json({
            success:0,
            message:"Invalid Data"
        })
       }
     const cart_details =    await cart.findOne({userId}).populate({
            path:"items.productId",
            select:'imageUrl title salesPrice price totalStock'
         })
           if(!cart_details){
        return res.status(404).json({
            success:0,
            message:"cart not found !..."
        })
    }
    cart_details.items = cart_details.items.filter(item=>item.productId._id.toString() !== productId)
    await cart_details.save()
    await cart_details.populate({
            path:"items.productId",
            select:'imageUrl title salesPrice price totalStock'
         })
            const updatedCartItmems = cart_details.items.map(item=>({
            productId:item.productId? item.productId._id:null,
            imageUrl:item.productId ? item.productId.imageUrl:null,
            title:item.productId?item.productId.title:null,
            price:item.productId?item.productId.price:null,
            salesPrice:item.productId?item.productId.salesPrice:null,
            quantity:item.quantity,
            totalStock:item.productId.totalStock
        }))
          return res.status(200).json({
            success:1,
            message:"cart updated Succefully",
             data:{
            ...cart_details._doc,
            items:updatedCartItmems
        }
        })
    }catch(error){
        console.log("cart error",error)
        return res.status(500).json({
            success:0,
            message:"some cart error"
        })
    }
}
const checkQuantity = async(productId,quantity)=>{
    const productDetails = await products.findById(productId)
    if(quantity>productDetails.totalStock){
       return false
    }
    else{
       return true
    }
   

}
export {addToCart,deleteCart,updateCart,getCart}