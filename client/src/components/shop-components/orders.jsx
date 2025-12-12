import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Dialog } from "../ui/dialog"
import ShoppingOrderDetails from "./order-details"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrderDetails, getOrders } from "@/store/shop-slice/orders-slice"
import { displayOrderStatus,orderStatusColors } from "@/config"
import { Badge } from "../ui/badge"

function ShoppingOrders(){
       const [openDialog,setOpenDialog] = useState(false)
       const dispatch = useDispatch()
       const {orderData,orderDetails} = useSelector(state=>state.shoppingOrderSlice)
       const {user} = useSelector(state=>state.auth)
       useEffect(()=>{
         dispatch(getOrders(user.id)).then(data=>{
            console.log(data,'order')
         })
       },[dispatch])
     function handleOrderDetails(currentOrderId){
        console.log(currentOrderId)
        dispatch(getOrderDetails(currentOrderId)).then(data=>{
            console.log(data)
        })
     }
    return(
        orderData && orderData.length>0?
        <Card>
            <CardHeader>
                Order History
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left" >Order Id</TableHead>
                            <TableHead className="text-left">Order Date</TableHead>
                            <TableHead className="text-center">Order Status</TableHead>
                            <TableHead className="text-right">Order Price</TableHead>
                            <TableHead className='sr-only'>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                     {
                        orderData.map(order=>{
                             const formattedDate = new Date(order.orderCreatedDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })
                             return(
                             <TableRow key={order._id}>
                            <TableCell className="text-left"> {order._id} </TableCell>
                            <TableCell className="text-left"> {formattedDate}</TableCell>
                            <TableCell className={`text-center`}> {
                                <Badge
                                    className={`${orderStatusColors[order.orderStatus]} px-3 py-1 rounded-full`}
                                >
                                        {displayOrderStatus[order.orderStatus]}
                                  </Badge>
} </TableCell>
                            <TableCell className="text-right"> $ {order.totalAmount.toFixed(2)} </TableCell>
                            <TableCell> 
                                                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                                        <Button onClick={()=>{setOpenDialog(true); handleOrderDetails(order._id)} }>View Details
                                                        </Button>
                                                    <ShoppingOrderDetails orderDetails={orderDetails}/>    
                                                    </Dialog>
                                                   
                                                </TableCell>

                            
                        </TableRow>
                             )
                        })
                     }
                        
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        : <div>No Order Data Found</div>
    )
}
export default ShoppingOrders