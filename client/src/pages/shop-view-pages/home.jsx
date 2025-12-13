import { Button } from "@/components/ui/button"
import bannerOne from "../../assets/banner-1.webp"
import bannerTwo from "../../assets/banner-2.webp"
import bannerThree from "../../assets/banner-3.webp"
import { Airplay, BabyIcon, ChevronLeftIcon,ChevronRightIcon, CloudLightning, Codepen, Heater, icons, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getShopProductDetailstrunk, getShopProducttrunk } from "@/store/shop-slice/product-slice"
import ShopingProductTile from "@/components/shop-components/shop-product-tile"
import { useNavigate } from "react-router-dom"
import ProductDialog from "@/components/shop-components/product-details"
import { addCart,getCart } from "@/store/shop-slice/cart-slice"
import { useToast } from "@/hooks/use-toast"
import { getFeatureImages } from "@/store/common-slice"


 const categoriesWithIcon = [
          {id:"men",label:"Men",icon:ShirtIcon},
          {id:"women",label:"Women",icon:CloudLightning},
          {id:"kids",label:"kids",icon:BabyIcon},
          {id:"accessories",label:"Accessories",icon:WatchIcon},
          {id:"footware",label:"Footware",icon:UmbrellaIcon}
     ]
 const brandsWithIcon = [
          {id:"nike",label:"Nike",icon:Shirt},
          {id:"puma",label:"Puma",icon:WashingMachine},
          {id:"zara",label:"Zara",icon:ShoppingBasket},
          {id:"adidas",label:"Adidas",icon:Airplay},
          {id:"roadstart",label:"RoadStar",icon:Heater}
     ]    
function ShopHome(){
    // const slides = [bannerOne,bannerTwo,bannerThree]
    const[currentSlide,setCurrentSlide]=useState(0)
    const dispatch = useDispatch()
    const {productList,productDetails} = useSelector(state=>state.shopProductsSlice)
    const {user} = useSelector(state=>state.auth)
    const {cartItems}  = useSelector(state=>state.shopCartslice)
    const {imageList} = useSelector(state=>state.imageUploaderSlice)
    const navigate = useNavigate()
    const [openDetailsDialog,setopenDetailsDialog] = useState(false)
    const {toast}   = useToast()
    function handleNavigate(item,section){
        sessionStorage.removeItem("filters")
        const currentFilter = {
            [section]:[item.id]
        }
        sessionStorage.setItem('filters',JSON.stringify(currentFilter))
        navigate("/shop/listing")
    }
    function handleAddProductToCart(product_id,product){
        if(cartItems && cartItems.items){
            let index = cartItems.items.findIndex(
              item => item.productId === product_id
            );
            if(index!==-1){
                console.log(cartItems.items[index].quantity)
                console.log(product.totalStock)
                if(cartItems.items[index].quantity+1>product.totalStock){
                    toast({
                    title:`Only ${product.totalStock} quantity can be added for this item`
                     
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
                dispatch(getCart({userId:user.id}))
                 toast({
                    title:data.payload.message
                })
            }
            })
        }
     function handleCurrentProduct(getCurrentProductId){
                  dispatch(getShopProductDetailstrunk(getCurrentProductId))
         }
      
           useEffect(()=>{
        if(productDetails!==null){
            setopenDetailsDialog(true)
        }
        else{
            setopenDetailsDialog(false)
        }
    },[productDetails])
     useEffect(
        ()=>{
            const timer= setInterval(() => {
                setCurrentSlide(prevSlide=>((prevSlide+1 + imageList.length)%imageList.length))
            }, 5000)
            return ()=>clearInterval(timer)
        },
    [] )
    useEffect(()=>{
            dispatch(getShopProducttrunk({filterParams:{},sortParams:'price-lowtohigh'}))
            dispatch(getFeatureImages())
    },[dispatch]
    )
    return(
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden ">
               {
                imageList.map((imageItem,index)=>
                <img
                src={imageItem.image}
                key={index}
                className={`${(index === currentSlide)?'opacity-100':'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 `}
                />)
               }
               <Button variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"  onClick
               ={()=>setCurrentSlide(prevSlide=>((prevSlide-1 + imageList.length)%imageList.length))} >
                <ChevronLeftIcon className="w-h h-4"/>
               </Button>
               <Button variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80" 
               onClick
               ={()=>setCurrentSlide(prevSlide=>((prevSlide+1 + imageList.length)%imageList.length))}>
                <ChevronRightIcon className="w-h h-4"/>
               </Button>
            </div>
            <section className="py-15 bg-gray-50">
                <div className="container mx-auto px-4">
                     <h2 className="text-3xl font-bold text-center mt-8 mb-8">Shop by Category</h2>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {
                            categoriesWithIcon && categoriesWithIcon.length>0?
                            categoriesWithIcon.map(categoryItem=>
                                <Card onClick={()=>handleNavigate(categoryItem,'category')} key={categoryItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        <categoryItem.icon className="w-12 h-12 mb-4 text-primary"/>
                                        <span className="font-bold">{categoryItem.label}</span>
                                    </CardContent>
                                </Card>
                            )
                            :null
                        }
                     </div>
                </div>

            </section>
            <section className="py-15 bg-gray-50">
                <div className="container mx-auto px-4">
                     <h2 className="text-3xl font-bold text-center mt-8 mb-8">Shop by Brand</h2>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {
                            brandsWithIcon && brandsWithIcon.length>0?
                            brandsWithIcon.map(brandItem=>
                                <Card onClick={()=>handleNavigate(brandItem,'brand')} key={brandItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        <brandItem.icon className="w-12 h-12 mb-4 text-primary"/>
                                        <span className="font-bold">{brandItem.label}</span>
                                    </CardContent>
                                </Card>
                            )
                            :null
                        }
                     </div>
                </div>

            </section>
            <section className="py-12">
               <div className="container mx-auto px-4">
                     <h2 className="text-3xl font-bold text-center mt-8 mb-8">Featured Products</h2>
                </div>   
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                    {
                        productList && productList.length>0?
                        productList.map(productItem=><ShopingProductTile key={productItem._id} product={productItem} handleAddProductToCart={handleAddProductToCart}  handleCurrentProduct={handleCurrentProduct}/>)
                        :null
                    }
                </div>  
            </section>
            <ProductDialog open={openDetailsDialog} setOpen={setopenDetailsDialog} product_details={productDetails}/>
        </div>
    )
}
export default ShopHome