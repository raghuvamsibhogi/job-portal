
import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"

function Adminsidebar({open,setOpen}){
     const adminSideBarMenuItems = [
    {
        id:'dashboard',
        label:'Dashboard',
        path:'/admin/dashboard',
        icon: <LayoutDashboard />
    },
     {
        id:'products',
        label:'Products',
        path:'/admin/products',
        icon: <ShoppingBasket />
    },
     {
        id:'orders',
        label:'Orders',
        path:'/admin/orders',
        icon:<BadgeCheck />
    }
]
 const navigate = useNavigate()

     function MenuItems({setOpen}){
        return <nav className="mt-8 flex-col flex gap-3">
                {
                    adminSideBarMenuItems.map(adminSideBarMenuItem=><div key={adminSideBarMenuItem.id} onClick={()=>{    navigate(adminSideBarMenuItem.path); setOpen?setOpen(false):null}} className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                    {adminSideBarMenuItem.icon}
                    <span>{adminSideBarMenuItem.label}</span>
                    </div>)
                }
        </nav>
    }
   
    return(
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side='left' className='w-64'>
                     <div className="flex flex-col h-full">
                         <SheetHeader className='border-b'>
                             <SheetTitle className='flex gap-2 mt-5 mb-5'>
                                <ChartNoAxesCombined size={30} />
                                <span className="text-2xl font-extrabold">Admin Panel</span>
                             </SheetTitle>
                         </SheetHeader>
                         <MenuItems setOpen={setOpen} />
                     </div>
                </SheetContent>
            </Sheet>
            <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
                <div onClick={()=>{navigate('/admin/dashboard')}} className="flex cursor-pointer items-center gap-2">
                    <ChartNoAxesCombined size={30} />                   
                     <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    )
}
export default Adminsidebar