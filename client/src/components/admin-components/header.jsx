import { AlignJustify, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { logOutAction } from "@/store/auth-slice"
import { useToast } from "@/hooks/use-toast"


function AdminHeader({setOpen}){
    const dispatch = useDispatch()
    const {toast} = useToast()
    function handleLogout(e){
        dispatch(logOutAction()).then(
            (data)=>{
                if(data.success){
                  toast({
                    title:data.message
                    })
                }
            }
        )
    }
    return(
        <header onClick={()=>setOpen(true)} className="flex items-center justify-between px-8 py-3 bg-background border-b">
           <Button className="lg:hidden sm:block">
            <AlignJustify />
            <span className="sr-only">Toggle Menu</span>

           </Button>
           <div className="flex flex-1 justify-end">
            <Button onClick={(e)=>handleLogout(e)} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
                <LogOut />
                Logout
            </Button>
           </div>
        </header>
    )
}
export default AdminHeader