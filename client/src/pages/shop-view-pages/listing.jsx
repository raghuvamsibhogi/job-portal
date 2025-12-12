import ProductFilter from "@/components/shop-components/filter"
import MyPagination from "@/components/common/pagination"
import ProductDialog from "@/components/shop-components/product-details"
import ShopingProductTile from "@/components/shop-components/shop-product-tile"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sortOptions } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { addCart, checkQuantity, getCart } from "@/store/shop-slice/cart-slice"
import { getShopProductDetailstrunk, getShopProducttrunk } from "@/store/shop-slice/product-slice"
import { ArrowUpDownIcon, ParkingMeter } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useSearchParams } from "react-router-dom"
function createSearchParamsHelper(filterParams){
    const queryParams = []  
 for( const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length>0){
        const paramValue =value.join(",")
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
 }
 return queryParams.join('&')
}
function ShopListing(){
    const dispatch = useDispatch()
    const {productList,productDetails} = useSelector((state)=>state.shopProductsSlice)
    const [filters,setFilters] =useState({})
    const [sort,setSort] = useState(null)
    const [searchParams,setSearchParams] = useSearchParams()
    const [openDetailsDialog,setopenDetailsDialog] = useState(false)
    const {cartItems}=useSelector((state)=>state.shopCartslice)
     const {user}=useSelector((state)=>state.auth)
     const {toast}=useToast()
     const location = useLocation()
     const limit = 2
     const [page,setCurrentPage] = useState(1)
     const[totalPages,setTotalPages]=useState(0)
      function handleSort(value){
        setSort(value)
    }
    function handleFilters(getSectionId,getCurrentOption){
           console.log(getSectionId,getCurrentOption)
           var copyFilters = {...filters}
           const indexOfCurrentSectionId = Object.keys(copyFilters).indexOf(getSectionId)
           if(indexOfCurrentSectionId === -1){
               copyFilters={
                ...copyFilters,
                [getSectionId]:[getCurrentOption],

               }
           }
           else{
            const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption)
            if(indexOfCurrentOption===-1){
                copyFilters[getSectionId].push(getCurrentOption)
            }
            else{
                copyFilters[getSectionId].splice(indexOfCurrentOption,1)
            }
           }
           setFilters(copyFilters)
           setCurrentPage(1)
           sessionStorage.setItem("filters",JSON.stringify(copyFilters))
           
    }
    // console.log(filters,"filters")
    
    function handleCurrentProduct(getCurrentProductId){
             dispatch(getShopProductDetailstrunk(getCurrentProductId))
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
                    title:data.payload.message
                })
            }
        })
    }
    useEffect(()=>{
      setSort('price-lowtohigh')
    },[])
    useEffect(()=>{
     if(sessionStorage.getItem("filters") !=''){
        console.log(sessionStorage.getItem("filters"),"setFilters")
        setFilters(JSON.parse(sessionStorage.getItem("filters")))
     }
     else{
        setFilters({})
     }
    },[sessionStorage.getItem("filters")])
    useEffect(()=>{
        if(productDetails!==null){
            setopenDetailsDialog(true)
        }
        else{
            setopenDetailsDialog(false)
        }
    },[productDetails])
    useEffect(()=>{
      if(filters && Object.keys(filters).length>0){
          const queryString = createSearchParamsHelper(filters)
          setSearchParams(new URLSearchParams(queryString))
      }
    },[filters])
    useEffect(()=>{
      
        if(filters !==null || sort !==null)
        dispatch(getShopProducttrunk({filterParams:filters,sortParams:sort,page:page,limit:limit})).then(data=>{
         if(data.payload.success){
            setTotalPages(Math.round(data.payload.totalRecords/limit))
         }
    })
    },[dispatch,filters,sort,page])


    return(
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filters} handleFilters={handleFilters}  />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold">
                        All Products
                        
                    </h2>
                    <div className="flex items-center gap-3">
                           <span className="text-muted-foreground mr-2">
                             {productList.length} products
                             </span>
                             <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">

                                <ArrowUpDownIcon className="h-4 w-4"/>
                                <span>sort by</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px]"  align="end">
                             <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                {
                                    sortOptions.map(sortItem=><DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.lable}</DropdownMenuRadioItem>)
                                }
                             </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {
                        productList && productList.length > 0 ? 
                        productList.map(productItem=><ShopingProductTile key={productItem._id} handleAddProductToCart={handleAddProductToCart} product={productItem} handleCurrentProduct={handleCurrentProduct}/>) : null
                    }
                </div>
                <div className="pt-2 pb-2 justify-center">
                    <MyPagination page={page} totalPages={totalPages} setPage={setCurrentPage}/>
                </div>
            </div>
            <ProductDialog open={openDetailsDialog} setOpen={setopenDetailsDialog} product_details={productDetails}/>
            
        </div>
    )
}
export default ShopListing