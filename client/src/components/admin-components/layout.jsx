import { useState } from "react";
import AdminHeader from "./header";
import Adminsidebar from "./sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout(){
    const [openSideBar,setOpenSideBar] = useState(false)
    return(
        <div>
            <div className="flex min-h-screen w-full">
                <Adminsidebar open={openSideBar} setOpen={setOpenSideBar} />
                <div className="flex flex-1 flex-col">
                    <AdminHeader setOpen={setOpenSideBar} />
                    <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}
 export default AdminLayout;