import { useState } from "react"
import CommonForm from "../common/form"
import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { useDispatch } from "react-redux"
import { getOrderDetails, getOrders, updateOrderStatus } from "@/store/admin-slice/orders-slice"
import { displayOrderStatus,orderStatusColors } from "@/config"
import { Badge } from "../ui/badge"

const intialFormData ={
    status:''
}
function AdminOrderDetails({orderDetails})
{

    const[formData,setFormData]=useState(intialFormData)
    const dispatch = useDispatch()
    function handleUpdateStatus(event){
         event.preventDefault()
         const {status} = formData
         dispatch(updateOrderStatus({orderId:orderDetails._id,orderStatus:status})).then(data=>{
            console.log(data)
            if(data.payload.success){
                dispatch(getOrderDetails(orderDetails._id))
                dispatch(getOrders())
                setFormData(intialFormData)
            }
         })

    }
    if(orderDetails.length<=0){
        return true
    }
       const formattedDate = new Date(orderDetails.orderCreatedDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })
    return(
        <DialogContent>
            <div className="sm:max-w-[600px]">
                <div className="grid gap-6 mt-4 mb-4">
                    <div className="grid gap-2">
                        <div className="flex mt-6 items-center justify-between">
                            <p className="font-medium">Order Id</p>
                             <Label>{orderDetails._id}</Label>
                        </div>
                         <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Date</p>
                             <Label>{formattedDate}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Price</p>
                             <Label>$ {orderDetails.totalAmount.toFixed(2)}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="font-medium">Order Status</p>
                             <Badge
                                    className={`${orderStatusColors[orderDetails.orderStatus]} px-3 py-1 rounded-full`}
                                >
                                        {displayOrderStatus[orderDetails.orderStatus]}
                                  </Badge>
                        </div>
                    </div>

                </div>
                <Separator/>
                <div className="grid mt-4 gap-4">
                    <div className="grid gap-2 mt-4 mb-4">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            {
                                orderDetails.cartItems.map(cartItem=>{
                                    return(
                                       <li className="flex items-center justify-between">
                                                <Label>Title : {cartItem.productTitle}</Label>
                                                <Label>Quantity : {cartItem.productQuantity}</Label>
                                                <Label>Price : $ {cartItem.productPrice}</Label>

                                  </li>
                                    )
                                })
                            }
                           

                        </ul>

                    </div>

                </div>
                <Separator/>
                 <div className="grid mt-4 gap-4">
                    <div className="grid gap-2 mt-4 mb-4">
                        <div className="font-medium">Shipping Info</div>
                           <div className="grid gap-0.5 text-muted-fores=ground">
                               <Label>{orderDetails.addressInfo.address}</Label>
                               <Label>{orderDetails.addressInfo.city}</Label>
                               <Label>{orderDetails.addressInfo.pinCode}</Label>
                               <Label>{orderDetails.addressInfo.phone}</Label>
                               <Label>{orderDetails.addressInfo.notes}</Label>
                            
                           </div>

                    </div>

                </div>
                <Separator/>
                <CommonForm
                formControls=
                { 
                        [ 
                            {
                                                name:"status",
                                                lable:"Status",
                                                Placeholder:"Select Status",
                                                componentType:"select",
                                                id:"status",
                                                options:[
                                                    {id:"pending",label:"Pending"},
                                                    {id:"inProcess",label:"In Process"},
                                                    {id:"inShipping",label:"In Shipping"},
                                                    {id:"delivered",label:"Delivered"},
                                                    {id:"rejected",label:"Rejected"}
                                                ]
                            }
                        ]
                }
                setFormData={setFormData}
                formData={formData}
                buttonText='Update Order Status'
                onSubmit={handleUpdateStatus}

                />
            </div>
        </DialogContent>

    )
}
export default AdminOrderDetails