import { useDispatch, useSelector } from "react-redux"
import { Button } from "../ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import UserCartContent from "./cart-content"
import { deleteCart, updateCart } from "@/store/shop-slice/cart-slice"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"



function UserCartWrapper({cartItems,setOpenCartSheet}){
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const {toast} = useToast()
    const navigate  = useNavigate()
      function handleCartProductItemDelete(productId){
            dispatch(deleteCart({userId:user.id,productId:productId})).then(data=>{
                if(data.payload.success==1){
                   toast({
                    title:"product deleted from cart"
                   })
                }
            })
      }
      function handleUpdateProductQuantity(productId,quantity){
       
        dispatch(updateCart({userId:user.id,productId,quantity})).then(
            data=>{
                if(data.payload.success==1){
                    toast({
                    title:"product updated in cart"
                   })
                }
                else{
                    console.log(data)
                    toast({
                    title:data.payload.message
                   })  
                }
            }
        )
      }
      const totaCartAmount = cartItems.items && cartItems.items.length>0?
      cartItems.items.reduce((sum,currentItem)=>sum+(currentItem.salesPrice>0?currentItem.salesPrice:currentItem.price)*currentItem.quantity,0):0
    return(
        <div>
            <SheetContent className="sm:max-wd-md">
                <SheetHeader>
                <SheetTitle>
                    Your Cart
                </SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
              {
                cartItems.items && cartItems.items.length>0?
                cartItems.items.map(item=><UserCartContent key={item._id} handleCartProductItemDelete={handleCartProductItemDelete} handleUpdateProductQuantity={handleUpdateProductQuantity} cartItem={item}/>)
                :
                null
              }
                </div>
                 <div className="mt-8 space-y-4">
                    <div className="flex justify-between">
                       <span className="font-bold">Total</span>  
                       <span className="font-bold">${totaCartAmount}</span>  
                    </div>
                </div>
                <Button onClick={()=>{navigate('/shop/Checkout'); setOpenCartSheet(false)}} disabled={cartItems && cartItems.items && cartItems.items.length>0?false:true} className="w-full mt-6">CheckOut</Button>
            </SheetContent>
        </div>
    )
}
export default UserCartWrapper