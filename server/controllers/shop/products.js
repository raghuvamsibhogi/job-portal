import products from "../../models/products-model.js";
const getProducts = async  (req,res) =>{
       try{
        let {category = [] , brand =[] , sortBy="price-lowtoHigh",page,limit} = req.query
        let filters = {}
        if(category.length)
        {
          filters.category = {$in:category.split(',')}
        }
         if(brand.length)
        {
          filters.brand = {$in:brand.split(',')}
        }   
        let sort={}
        switch(sortBy){
          case 'price-lowtohigh':
            sort.price=1
            break;
           case 'price-hightolow':
            sort.price=-1
            break;
            case 'title-atoz':
            sort.title=1
            break;
            case 'title-ztoa':
            sort.title=-1
            break; 
            default:
                sort.price=1
                break
        }
        console.log(sort)
        let products_listing = []
         if(page!='undefined'){
          page = (page-1)*limit
          products_listing = await products.find(filters).sort(sort).skip(page).limit(limit)
           
        }
        else{
            products_listing = await products.find(filters).sort(sort)
        }
       const totalRecords = await products.countDocuments(filters)
        if(products_listing){
             return res.status(200).json({
            success:true,
            message:"Products fetched Successfully",
            data : products_listing,
            totalRecords:totalRecords
        })
        }
        else{
            return res.status(200).json({
            success:false,
            message:"Products not found",
            data:products
        })
        }
        
       }
       catch(e){
        console.log(e)
          res.status(500).json({
            success:false,
            message:"some error"

        })

       }
}
const getProductDetails = async(req,res)=>{
  try{
      const {id} = req.params
      const product_details = await products.findById(id)
       if(product_details){
             return res.status(200).json({
            success:true,
            message:"Products fetched Successfully",
            data : product_details
        })
        }
        else{
            return res.status(200).json({
            success:false,
            message:"Products not found",
            data:products
        })
      }

  }
  catch(e){
           console.log(e)
          res.status(500).json({
            success:false,
            message:"some error"

        })
  }

}
export {getProducts,getProductDetails}