import { uploadFile } from "../../helpers/cloudinary-helper.js"
import products from "../../models/products-model.js"

const handleImageUpload = async(req,res)=>{
    try{
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:"+req.file.mimetype+";base64,"+b64
        const result = await uploadFile(url)
        console.log(result)
        return res.json({
          success:true,
          result
        })
    }
    catch(error){
        console.log(error)
           return res.status(500).json({
              success:false,
              message:"something went wrong while uploading image"
           })
    }
}
const addProduct = async(req,res)=>{
    
    try{
          const {image,title,description,category,brand,price,sales_price,total_stock} = req.body
          const newProductDetails = new products({
            imageUrl:image,
            title,
            description,
            category,
            brand,
            price,
            salesPrice:sales_price,
            totalStock:total_stock

          })
          await newProductDetails.save()
          return res.status(201).json({
            success:true,
            message:"Product Created Successfully",
            data:newProductDetails
          })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Some thing went wrong while adding product"
        })
    }

}
const updateProduct = async(req,res)=>{
    try{
       const {image,title,description,category,brand,price,sales_price,total_stock} = req.body
        const {id} = req.params
           const productDetails = await products.findById(id)
           if(productDetails){
                 productDetails.title = title || productDetails.title
                 productDetails.description = description || productDetails.description
                 productDetails.category = category || productDetails.category
                 productDetails.brand = brand || productDetails.brand
                 productDetails.totalStock = total_stock || productDetails.totalStock
                 productDetails.imageUrl = image || productDetails.imageUrl
                 productDetails.price = price!=''?price:0
                 productDetails.salesPrice = sales_price!=''?sales_price:0
                 await productDetails.save()
                 
                 return res.status(200).json({
                        success:true,
                        message:"Product update Successfully",
                        data:productDetails
                        })
           }
           else{
                  return res.status(200).json({
                        success:false,
                        message:"Product Not Found",
                        data:productDetails
                        })
           }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Some thing went wrong while updating product"
        })
    }
}
const deleteProduct = async(req,res)=>{
        try{
                    const {id} = req.params
           const productDetails = await products.findById(id)
           if(productDetails){
                await products.findByIdAndDelete(id)
                return res.status(200).json({
                        success:true,
                        message:"Product delete Successfully",
                        })
           }
           else{
                  return res.status(200).json({
                        success:false,
                        message:"Product Not Found",
                        data:productDetails
                        })
           }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Some thing went wrong while deleting product"
        })
    }
}
const getProducts = async(req,res)=>{
      try{
         const listOfProducts = await products.find({})
         return res.status(201).json({
            success:true,
            message:"Products fetched  Successfully",
            data:listOfProducts
          })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Some thing went wrong while fetching product"
        })
    }
}

export {addProduct,updateProduct,deleteProduct,handleImageUpload,getProducts}