import products from "../../models/products-model.js";
const searchProduct = async(req,res)=>{
    const {keyword}=req.query
    if(keyword=='' || typeof keyword != 'string'){
        return res.status(400).json({
            success:0,
            message:"keyword is required and must be in string format"
        })
    }
    const regexp = new RegExp(keyword,'i')
    const createSearchQuery ={
        $or:[
            {title:regexp},
            {description:regexp},
            {category:regexp},
            {brand:regexp},
        ]
    }
    const products_list = await products.find(createSearchQuery)
    console.log(products_list)
    if(products_list.length==0){
         return res.status(400).json({
            success:0,
            message:"product not found"
        })
    }
    return res.status(200).json({
            success:1,
            message:"product found",
            data:products_list
        })

}
export default searchProduct