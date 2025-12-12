import Address from "../../models/address.js"
const addAddress = async(req,res)=>{
    try{
      const {userId,address,city,phone,pinCode,notes} = req.body
      if(!userId || !address || !city || !phone || !pinCode || !notes){
        return res.status(400).send({
            success:0,
            message:"Invalid Data"
        })
      
      } 
        const newLyCreateAddress = new Address({
            userId,
            address,
            city,
            phone,
            pinCode,
            notes

        })
        await newLyCreateAddress.save()
        return res.status(201).json({
            success:1,
            data:newLyCreateAddress,
            message:"Address added Successfully"

        })
    }
    catch(error){
        return res.status(500).json({
            success:0,
            message:"Some Error"
        })
    }
}
const updateAddress = async(req,res)=>{
    try{
       const {userId,addressId} = req.params
       if(!userId || !addressId){
          return res.status(400).send({
            success:0,
            message:"user and address requires"
        })
       }
       const formData = req.body
       const addressDetails = await Address.findOneAndUpdate({userId,_id:addressId},formData,{new:true})
       if(!addressDetails){
          return res.status(400).send({
            success:0,
            message:"address not found"
        })
        

       }
       return res.status(201).json({
            success:1,
            data:addressDetails,
            message:'Address Updated Successfully'
        })
    }
    catch(error){
        return res.status(500).json({
            success:0,
            message:"Some Error"
        })
    }
}
const deleteAddress = async(req,res)=>{
    try{
        const {userId,addressId} = req.params
       if(!userId || !addressId){
          return res.status(400).send({
            success:0,
            message:"user and address requires"
        })
       }
       const addressDetails = await Address.findOneAndDelete({userId,_id:addressId})
       if(!addressDetails){
          return res.status(400).json({
            success:0,
            message:"address not found"
        })
        

       }
       return res.status(201).json({
            success:1,
            data:addressDetails,
            message:'Address Deleted Successfully'
        })
    }
    catch(error){
        return res.status(500).json({
            success:0,
            message:"Some Error"
        })
    }
}
const fetchAddress = async(req,res)=>{
    try{
          const {userId} = req.params
       if(!userId){
          return res.status(400).json({
            success:0,
            message:"user requires"
        })
       }
       const addressDetails = await Address.find({userId})
       if(!addressDetails){
          return res.status(400).json({
            success:0,
            message:"address not found"
        })
        

       }
       return res.status(201).json({
            success:1,
            data:addressDetails,
            message:'Address fetched Successfully'
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:0,
            message:"Some Error"
        })
    }
}
export {addAddress,updateAddress,deleteAddress,fetchAddress}
