import { AlignJustify, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { logOutAction, resetTokenAndCredentials } from "@/store/auth-slice"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"


function AdminHeader({setOpen}){
    const dispatch = useDispatch()
    const {toast} = useToast()
    const navigate = useNavigate()
    function handleLogout(e){
        // dispatch(logOutAction()).then(
        //     (data)=>{
        //         if(data.success){
        //           toast({
        //             title:data.message
        //             })
        //         }
        //     }
        // )
        toast({
                    title:'Logout Successfully'
                    })
        dispatch(resetTokenAndCredentials())
        sessionStorage.clear()
        navigate('/auth/login')            
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