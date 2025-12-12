import { useSelector } from "react-redux"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"

function ShopingProductTile({product,handleCurrentProduct,handleAddProductToCart}){
    const {cartItems} = useSelector(state=>state.shopCartslice)
    let canProcessToCart = 1
    if(cartItems && cartItems.items){
        const index = cartItems.items.findIndex(
              item => item.productId === product._id
            );
        // console.log(findIndexOfCurrentProduct,product.title)
        if(index!==-1){
            // console.log(cartItems.items[index])
       
            if(cartItems.items[index].quantity > product.totalStock){
                console.log('hey')
                canProcessToCart = 0
            }
            else{
              canProcessToCart = 1
            }
        }
    }
    // const canProcessToCart = (cartItems && cartItems.items && cartItems.items.productId==product._id)?(cartItems.items.quantity>product.totalStock?0:1):1
   return (
    <Card className="w-full max-w-sm mx-auto">
        <div onClick={()=>handleCurrentProduct(product._id)}>
        <div className="relative">
            <img src={product.imageUrl}
            alt={product.title}
            className="w-full h-[300px] object-cover rounded-t-lg"/>
            {
            product.totalStock<10 && product.totalStock>0? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                {`only ${product.totalStock} items`}
           </Badge>:    
            product.salesPrice > 0 && product.totalStock>0 ? 
           <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Sale
           </Badge>
            :null
             }

        </div>
        <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2 "> {product.title}</h2>
            <div className="flex justify-between items-center mb-2">
                <span className="text-xl text-muted-foreground">{product.category}</span>
                <span className="text-xl text-muted-foreground">{product.brand}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className={`${product.salesPrice > 0 ? "line-through":""} text-lg font-semibold text-primary`}>{product.price}</span>
                {
                    product.salesPrice >0 ? <span className="text-lg font-semibold text-primary">{product.salesPrice}</span> : null
                }
                
            </div>

        </CardContent>
      
        
   </div>
     <CardFooter>
        {
          product.totalStock>0?(
        canProcessToCart==1?<Button className="w-full" onClick={()=>handleAddProductToCart(product._id,product)}>
                Add to cart
            </Button>:<Button className="w-full"  disabled={true}>Cart Items Exceeds overall total stock of product</Button>):<Button className="w-full"  disabled={true}>
                Out Of Stock
            </Button>
        }
            
        </CardFooter>
    </Card>
   )
}
export default ShopingProductTile