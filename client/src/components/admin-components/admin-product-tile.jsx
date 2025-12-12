import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
function AdminProductTile({product,setOpenCreateProductDialog,setCurrentEditProductId,setFormProductData,isEditMode,handleDelete}){
   const [a,setA]=useState(a)
   function handleEditbutton(event){
      event.preventDefault()
      setCurrentEditProductId(product._id)
      setOpenCreateProductDialog(true)
      const currentProduct = { 
                                 ...product, 
                                 image: product.imageUrl,
                                 sales_price:product.salesPrice,
                                 total_stock:product.totalStock

                              };
      console.log(currentProduct,"edit")   
      const requiredFields = {
       image:null,
        title:"",
        description:"",
        category:"",
        brand:"",
        price:"",
        sales_price:"",
        total_stock:""
    }                     
      
        const cleanedProduct = Object.fromEntries(
    Object.entries(currentProduct).filter(([key]) =>
      Object.keys(requiredFields).includes(key)
    )
  );
      console.log(cleanedProduct,'current product')
      setFormProductData(cleanedProduct)

   }
   return(
    <Card className='w-full max-w-sm mx-auto'>
           <div>
                 <div className="relative">
                      <img src={product.imageUrl}
                           alt={product.title} 
                           className="w-full h-[300px] object-cover rounded-t-lg " 
                      />
                      
                 </div>
                 <CardContent>
                    <h2 className="text-xl mb-2 font-bold">{product.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                       <span className={`${product.salesPrice>0 ? "line-through":""} text-lg font-semibold text-primary`}>{product.price}</span>
                        {(product.salesPrice>0)?<span className="text-lg font-bold">{product.salesPrice}</span>:null}
                       
                    </div>
                 </CardContent>
                 <CardFooter className='flex justify-between items-center'>
                 <Button onClick={(e)=>handleEditbutton(e)}>Edit</Button>
                 <Button onClick={(e)=>handleDelete(product._id)}>Delete</Button>
                 </CardFooter>
           </div>
    </Card>
   )
}
export default AdminProductTile