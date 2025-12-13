import Address from "@/components/shop-components/address"
import accountImage from "../../assets/account.jpg"
import { useDispatch, useSelector } from "react-redux"
import UserCartContent from "@/components/shop-components/cart-content"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { createNewOrder } from "@/store/shop-slice/orders-slice"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
function ShopCheckOut(){
    const {cartItems} = useSelector(state=>state.shopCartslice)
    const totalCartAmount = cartItems.items && cartItems.items.length>0?
    cartItems.items.reduce((sum,currentItem)=>sum+(currentItem.salesPrice>0?currentItem.salesPrice:currentItem.price)*currentItem.quantity,0):0
    const {user} = useSelector(state=>state.auth) 
    const [currentSelectedAddress,setCurrentSelectedAddress] = useState(null)
    const [isPaymentStart,setIsPaymentStart] = useState(false)
    const {approvalUrl,orderId,isLoading} = useSelector(state=>state.shoppingOrderSlice)
    const dispatch = useDispatch()
    const {toast} = useToast()

    async function handleIntialPaypal(){
         if(currentSelectedAddress === null){
            toast({
                title:"Please Select Address",
                variant:"destructive"
            })
            return true
         }
          const orderData = {
            cartId:cartItems._id,
             userId:user.id,
                cartItems:cartItems.items.map(singleCartItem=>({
                productId:singleCartItem.productId,
                productImage:singleCartItem.imageUrl,
                productPrice:(singleCartItem.salesPrice>0)?singleCartItem.salesPrice:singleCartItem.price,
                productTitle:singleCartItem.title,
                productQuantity:singleCartItem.quantity
                })),
                addressInfo:{
                    address:currentSelectedAddress.address,
                    city:currentSelectedAddress.city,
                    notes:currentSelectedAddress.notes,
                    phone:currentSelectedAddress.phone,
                    pinCode:currentSelectedAddress.pinCode,
                    addressId:currentSelectedAddress._id
                },
             
                orderStatus:'pending',
                paymentMethod:'paypal',
                paymentStatus:'pending',
                totalAmount:totalCartAmount,
                orderCreatedDate:new Date(),
                orderUpdatedDate: new Date(),
                paymentId:'',
                payerId:''
        }
       await dispatch(createNewOrder(orderData)).then(data=>{
        console.log(data,'dispatch')
        
           if(data.payload.success){
             setIsPaymentStart(true)
           }
           else{
             toast({
                title:data.payload.message
             })
            setIsPaymentStart(false)
           }
        })
        console.log(approvalUrl,'approvalUrl')
       
       
      }
       useEffect(() => {
  if (!approvalUrl) return;

  const interval = setInterval(() => {
    window.location.href = approvalUrl;
  }, 5000);

  return () => clearInterval(interval); // Cleanup on component unmount
}, [approvalUrl]);
      return(
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img 
                  src={accountImage}
                  className="h-full w-full object-cover object-center"
                />

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                <Address selectedAddressId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress}/>
                 <div className="flex flex-col gap-4">
                     {cartItems.items && cartItems.items.length>0? cartItems.items.map(cartItem=><UserCartContent cartItem={cartItem} />) :null}
                      <div className="mt-8 space-y-4">
                    <div className="flex justify-between">
                       <span className="font-bold">Total</span>  
                       <span className="font-bold">${totalCartAmount}</span>  
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <Button onClick={()=>handleIntialPaypal()} disabled={isPaymentStart || isLoading } className="w-full">{(isPaymentStart || isLoading)?<Spinner/>:null}{isPaymentStart?'Processing Payment':'Check Out With Paypal'}</Button>
                </div>
                 </div>

            </div>
        </div>
    )
}
export default ShopCheckOut