import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { addCart, getCart } from "@/store/shop-slice/cart-slice";
import { getShopProductDetailstrunk, setProductDetails } from "@/store/shop-slice/product-slice";
import Rating from "../common/star-rating";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { addReview, getProductReview } from "@/store/shop-slice/review-slice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";




function ProductDialog({open,setOpen,product_details}){
    if (!product_details) return null
    console.log(open)
      const {toast} = useToast()
      const dispatch = useDispatch()
      const {user} = useSelector(state=>state.auth)
      const {cartItems}  = useSelector(state=>state.shopCartslice)
      const {productReviewList} = useSelector(state=>state.productReviewSlice)
      const [reviewMessage,setReviewMessage]=useState('')
      const [ratingValue,setRatingValue] = useState(0)
      dayjs.extend(relativeTime);
    function handleRatingChange(star){
        console.log(star,'rating')
        setRatingValue(star)
    }
    function handleReviewSubmit(productId){
        dispatch(addReview({userId:user.id,userName:user.userName,reviewMessage:reviewMessage,reviewValue:ratingValue,productId:product_details._id})).then(
            data=>{
                if(data.payload.success){
                    toast({
                       title : data.payload.message
                    })
                    setRatingValue(0)
                    setReviewMessage('')
                    dispatch(getProductReview(product_details._id))
                    dispatch(getShopProductDetailstrunk(product_details._id))
                }
                else{
                     toast({
                       title : data.payload.message,
                       variant:'destructive'
                    })
                    dispatch(getProductReview(product_details._id))
                }
            }
        )

    }
    function handleAddProductToCart(product_id){
        if(cartItems && cartItems.items){
            let index = cartItems.items.findIndex(
              item => item.productId === product_id
            );
            if(index!==-1){
                console.log(cartItems.items[index].quantity)
                if(cartItems.items[index].quantity+1>product_details.totalStock){
                    toast({
                    title:`Only ${product_details.totalStock} quantity can be added for this item`,
                    variant:"destructive"
                     
                })
                return true;
                }
            }
        }
        dispatch(addCart({userId:user.id,productId:product_id,quantity:1})).then(data=>{
            console.log("addCart",data)
            if(data.payload.success==1){
                dispatch(getCart({userId:user.id}))
                toast({
                    title:"product added to cart"
                })
            }
            else{
                  toast({
                    title:data.payload.message,
                    variant:"destructive"
                })
            }
        })
    }
    function handleProductDialogOpen(){
        setOpen(false)
        dispatch(setProductDetails())
        setRatingValue(0)
        setReviewMessage('')
    }
    useEffect(()=>{
      if(product_details!==null) dispatch(getProductReview(product_details._id))
    },[product_details])
console.log(productReviewList)
 return (
    <Dialog open={open} onOpenChange={handleProductDialogOpen}  >
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
             <VisuallyHidden>
          <DialogTitle>{product_details.title}</DialogTitle>
          <DialogDescription>
            {product_details.description}
          </DialogDescription>
        </VisuallyHidden>
            <div className="relative overflow-hidden rounded-md">
              <img 
               src={product_details.imageUrl}
               alt={product_details.title}
               width={600}
               height={600}
               className="aspect-square w-full object-cover"
              />
            </div>
            <div >
                <div>
                    <h1 className="text-3xl font-extrabold">{product_details.title}</h1>
                    <p className="text-muted-foreground text-2xl mb-5 mt-4">{product_details.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className={`text-3xl font-bold text-primary ${product_details.salesPrice>0 ? " line-through":""}`}>{product_details.price} </p>
                    {
                        (product_details.salesPrice>0) ? product_details.salesPrice:null
                    }
                </div>
                <div className="flex items-center gap-2 mt-2">
                     <div className="flex items-center gap-0.5">
                        <Rating ratingValue={product_details.averageReview}/>
                                    {/* <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                    <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                    <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                    <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                    <StarIcon className="w-5 h-5 fill-primary"></StarIcon> */}
                      </div>
                      <span className="text-muted-foreground">({product_details.averageReview})</span>
                </div>
               <div className="mt-5 mb-5">
                {
                    product_details.totalStock>0?<Button className="w-full" onClick={()=>handleAddProductToCart(product_details._id)}>Add to cart
                </Button>:<Button className="w-full" disabled={true}>out of stock
                </Button>
                }
                

               </div>
               <Separator/>
               <div className="max-h-[300px] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                <div className="grid gap-6">
                {
                    productReviewList && productReviewList.length > 0 ?
                    productReviewList.map(reviewItem=>
                        <div className="flex gap-4">
                        <Avatar>
                            <AvatarFallback className="w-10 h-10 border">
                                {reviewItem.userName[0]}
                            </AvatarFallback>
                        </Avatar>
                         <div className="grid gap-1">
                            <div className="flex items-center gap-2">
                                   <h3 className="font-bold">{reviewItem.userName}</h3>
                                   <span>{dayjs(reviewItem.createdAt).fromNow()}</span> 
                            </div>
                            <div className="flex items-center gap-0.5">
                                <Rating ratingValue={reviewItem.reviewValue}/>
                                    {/* <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                    <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                    <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                    <StarIcon className="w-5 h-5 fill-primary"></StarIcon>
                                    <StarIcon className="w-5 h-5 fill-primary"></StarIcon> */}
                            </div>
                            <p>{reviewItem.reviewMessage}</p>
                           
                         </div>
                    </div>

                    )
                     
                    : 
                    <h1>No product reviews Found</h1>
                }
                   
                    

                </div>
                <div className="mt-10 flex flex-col gap-2">
                    <Label>Write a Review</Label>
                    <div className="flex">
                      <Rating ratingValue={ratingValue} handleRatingChange={handleRatingChange}/>
                    </div>
                    <Input name="revieMessage" onChange={(event)=>setReviewMessage(event.target.value)} placeholder="write a review"/>
                    <Button onClick={handleReviewSubmit} disabled={reviewMessage.trim()==='' || ratingValue==0}>Submit</Button>
                </div>
               </div>
            </div>
 
        </DialogContent>
 
    </Dialog>
 )
}
export default ProductDialog