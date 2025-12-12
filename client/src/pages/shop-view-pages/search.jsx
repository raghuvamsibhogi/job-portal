import ProductDialog from "@/components/shop-components/product-details"
import ShopingProductTile from "@/components/shop-components/shop-product-tile"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { addCart, getCart } from "@/store/shop-slice/cart-slice"
import { getShopProductDetailstrunk } from "@/store/shop-slice/product-slice"
import { resetSearchResults, searchProduct } from "@/store/shop-slice/search-slice"
import { SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

function SearchProducts1(){
   const [keyword,setKeyword] = useState('')
   const dispatch = useDispatch()
   const {searchProductList} = useSelector(state=>state.searchProductSlice)
   const {cartItems} = useSelector(state=>state.shopCartslice)
   const {productList,productDetails} = useSelector((state)=>state.shopProductsSlice)
   const {user} = useSelector(state=>state.auth)
   const {searchParms,setSearchParams} = useSearchParams()
   const {toast} = useToast()
   const [openDetailsDialog,setopenDetailsDialog] = useState(false)
    function handleCurrentProduct(getCurrentProductId){
                dispatch(getShopProductDetailstrunk(getCurrentProductId))
       }
       function handleAddProductToCart(product_id,product){
           if(cartItems && cartItems.items){
               let index = cartItems.items.findIndex(
                 item => item.productId === product_id
               );
               if(index!==-1){
                   if(cartItems.items[index].quantity+1>product.totalStock){
                       toast({
                       title:`Only ${product.totalStock} quantity can be added for this item`,
                       variant:"destructive"
                        
                   })
                   return true;
                   }
               }
           }
           dispatch(addCart({userId:user.id,productId:product_id,quantity:1})).then(data=>{
               if(data.payload.success==1){
                   dispatch(getCart({userId:user.id}))
                   toast({
                       title:"product added to cart"
                   })
               }
               else{
                   dispatch(getCart({userId:user.id}))
                    toast({
                       title:data.payload.message,
                       variant:"destructive"
                   })
               }
           })
       }
       useEffect(()=>{
        if(productDetails!==null){
            setopenDetailsDialog(true)
        }
        else{
            setopenDetailsDialog(false)
        }
    },[productDetails])
   useEffect(()=>{
      console.log(keyword)
      if(keyword && keyword.trim()!='' && keyword.trim().length>3 ){
         setTimeout(()=>{
               // setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
               dispatch(searchProduct(keyword))
         },1000)
      }
      else{
         dispatch(resetSearchResults())
      }
      
   },[keyword])

   console.log(searchProductList)
   return(
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
               <div className="w-full flex items-center">
                  <Input className='py-6' placeholder="Search Products" name='keyword' id='keyword' onChange={(event)=>setKeyword(event.target.value)}/>
               </div>
            </div>
            
                {
                  keyword && keyword.trim()!='' && keyword.trim().length>3?
                  searchProductList && searchProductList.length>0? 
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        { searchProductList.map(product=>
                              <ShopingProductTile product={product} handleAddProductToCart={handleAddProductToCart} handleCurrentProduct={handleCurrentProduct}/>
                           )
                           }
                  </div>
                  : <h1 className="text-5xl font-extrabold"> No Result Found</h1>
                  : null
               } 
            <ProductDialog open={openDetailsDialog} setOpen={setopenDetailsDialog} product_details={productDetails}/>
         </div>
   )
}
function SearchProducts(){
   const [keyword,setKeyword] = useState('')
   const dispatch = useDispatch()
   const {searchProductList} = useSelector(state=>state.searchProductSlice)
   const {cartItems} = useSelector(state=>state.shopCartslice)
   const {productList,productDetails} = useSelector((state)=>state.shopProductsSlice)
   const {user} = useSelector(state=>state.auth)
   const {searchParms,setSearchParams} = useSearchParams()
   const {toast} = useToast()
   const [openDetailsDialog,setopenDetailsDialog] = useState(false)
    function handleCurrentProduct(getCurrentProductId){
                dispatch(getShopProductDetailstrunk(getCurrentProductId))
       }
       function handleAddProductToCart(product_id,product){
           if(cartItems && cartItems.items){
               let index = cartItems.items.findIndex(
                 item => item.productId === product_id
               );
               if(index!==-1){
                   if(cartItems.items[index].quantity+1>product.totalStock){
                       toast({
                       title:`Only ${product.totalStock} quantity can be added for this item`,
                       variant:"destructive"
                        
                   })
                   return true;
                   }
               }
           }
           dispatch(addCart({userId:user.id,productId:product_id,quantity:1})).then(data=>{
               if(data.payload.success==1){
                   dispatch(getCart({userId:user.id}))
                   toast({
                       title:"product added to cart"
                   })
               }
               else{
                   dispatch(getCart({userId:user.id}))
                    toast({
                       title:data.payload.message,
                       variant:"destructive"
                   })
               }
           })
       }
       useEffect(()=>{
        if(productDetails!==null){
            setopenDetailsDialog(true)
        }
        else{
            setopenDetailsDialog(false)
        }
    },[productDetails])
   useEffect(()=>{
      console.log(keyword)
      if(keyword && keyword.trim()!='' && keyword.trim().length>3 ){
         setTimeout(()=>{
               // setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
               dispatch(searchProduct(keyword))
         },1000)
      }
      else{
         dispatch(resetSearchResults())
      }
      
   },[keyword])

   console.log(searchProductList)
   return(
        <div className="container 2xl:px-20  mx-auto my-10">
            <div className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-16 text-center mx-2 rounded-xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Over 10000+ products to search</h2>
                <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5 ">Your Dressing Sense is with us</p>
               <div className="max-w-xl mx-4 sm:mx-auto">
                        <div className="flex items-center bg-white rounded-lg px-4">
                          <SearchIcon className="text-gray-500 w-5 h-5" />
                            <Input
                            placeholder="Search For Products"
                            name="keyword"
                            id="keyword"
                            className="
                                         text-black
                                        border-0
                                        focus:outline-none
                                        focus:ring-0
                                        focus-visible:ring-0
                                        focus:ring-offset-0
                                        focus-visible:ring-offset-0
                                        bg-transparent
                                     "

                            onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                </div>
    
            </div>
            
                {
                  keyword && keyword.trim()!='' && keyword.trim().length>3?
                  searchProductList && searchProductList.length>0? 
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
                        { searchProductList.map(product=>
                              <ShopingProductTile product={product} handleAddProductToCart={handleAddProductToCart} handleCurrentProduct={handleCurrentProduct}/>
                           )
                           }
                  </div>
                  : <h1 className="text-5xl font-extrabold"> No Result Found</h1>
                  : null
               } 
            <ProductDialog open={openDetailsDialog} setOpen={setopenDetailsDialog} product_details={productDetails}/>
         </div>
   )
}
export default SearchProducts
