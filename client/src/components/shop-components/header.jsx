import { HousePlug, LogOut, Menu, ShoppingCart, UserCog} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { shopHeaderMenuItems } from "@/config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback } from "../ui/avatar"
import { logOutAction } from "@/store/auth-slice"
import { useEffect, useState } from "react"
import UserCartWrapper from "./cart-wrapper"
import { getCart } from "@/store/shop-slice/cart-slice"
import { Label } from "../ui/label"
function MenuItmems(){
     const navigate = useNavigate()
    function handleNavigate(item,section){
       
      
        if(item.id=='home'){
              sessionStorage.removeItem("filters")
            navigate("/shop/home")
        }
        else if(item.id=='products'){
            sessionStorage.removeItem("filters")
            navigate("/shop/listing") 
        }
        else if(item.id=='search'){
             sessionStorage.removeItem("filters")
            navigate("/shop/search") 
        }
        else{
                  const currentFilter = {
            category:[item.id]
        }
        console.log(currentFilter)
          sessionStorage.removeItem("filters")
        sessionStorage.setItem('filters',JSON.stringify(currentFilter))
             navigate("/shop/listing")
        }
       
    }
    return (
        <nav className="flex flex-col lg:mb-0 lg:items-center gap-6 lg:flex-row">
            {
                shopHeaderMenuItems.map(shopHeaderMenuItem=><Label onClick={()=>handleNavigate(shopHeaderMenuItem)} key={shopHeaderMenuItem.id} className="text-sm font-medium cursor-pointer">{shopHeaderMenuItem.label}</Label>)
            }

        </nav>
    )
}
function HeaderRightContent({user}){
    const navigate =useNavigate()
    const dispatch = useDispatch()
    function handleLogOut(){
        console.log('hey')
        dispatch(logOutAction())
    }
    const [openCartSheet,setOpenCartSheet] = useState(false)
    const {cartItems}=useSelector((state)=>state.shopCartslice)
    useEffect(()=>{
      dispatch(getCart({userId:user.id}))
    },[dispatch])
    console.log(cartItems)
    return(
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
                <Button onClick={()=>setOpenCartSheet(true)} variant="outline" size='icon' className="relative">
                <ShoppingCart className="w-6 h-6"/>
                <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
                  {(cartItems && cartItems.items)?cartItems.items.length : null}
                </span>
                <span className="sr-only">User Cart</span>
                </Button>
                <UserCartWrapper cartItems={cartItems} setOpenCartSheet={setOpenCartSheet}/>
            </Sheet>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="bg-black cursor-pointer">
                    <AvatarFallback className="bg-black text-white font-extrabold">
                        {/* {user.userName} */}
                        {user.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent side='right' className='w-56 '>
                      <DropdownMenuLabel>Logged in as {user.userName} </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={()=>navigate("/shop/account")} >
                        <UserCog className="mr-2 h-2 w-2"/>
                        Account
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogOut}>
                        <LogOut className="mr-4 h-4 w-4"/>
                        Logout
                      </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


        </div>
    )
}
function ShopHeader(){
    const {isAuthenticated,isLoading,user} = useSelector(state=>state.auth)
    console.log(isAuthenticated)
    return(
       <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 ">
            <Link className="flex items-center gap-2" to="/shop/home">
               <HousePlug className="h-6 w-6"/>
               <span className="font-bold">E commerce</span>
            </Link>
            <Sheet>
            <SheetTrigger asChild>
                <Button variant='outline' size='icon' className="lg:hidden">
                    <Menu className="h-6 w-6"/>
                     <span className="sr-only">Toggle Header Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-full max-w-xs'>
                 <MenuItmems/>
                 <HeaderRightContent user={user}/>
            </SheetContent>
            <div className="hidden lg:block">
             <MenuItmems/>
            </div>
            
                <div className="hidden lg:block">
                    <HeaderRightContent user={user}/>
                </div>
            

        </Sheet>
        </div>
        
       </header>
    )
}
export default ShopHeader