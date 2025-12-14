import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import AdminOrderDetails from "./order-details"
import { useDispatch, useSelector } from "react-redux"
import { getOrderDetails, getOrders} from "@/store/admin-slice/orders-slice"
import { displayOrderStatus,orderStatusColors } from "@/config"
import { Badge } from "../ui/badge"
import MyPagination from "../common/pagination"
function AdminViewOrders1(){
    const [openDialog,setOpenDialog] = useState(false)
    return(
                <Card>
                    <CardHeader>
                        All Orders 
                    </CardHeader>
                    <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Order Id</TableHead>
                                                <TableHead>Order Date</TableHead>
                                                <TableHead>Order Status</TableHead>
                                                <TableHead>Order Price</TableHead>
                                                <TableHead className='sr-only'>Details</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell> 123456 </TableCell>
                                                <TableCell> 30/11/25 </TableCell>
                                                <TableCell> In Process </TableCell>
                                                <TableCell> $500 </TableCell>
                                                <TableCell> 
                                                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                                        <Button onClick={()=>{setOpenDialog(true)}}>View Details
                                                        </Button>
                                                    <AdminOrderDetails/>    
                                                    </Dialog>
                                                   
                                                </TableCell>
                    
                                                
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                </Card>
    )
}
function AdminViewOrders(){
       const [openDialog,setOpenDialog] = useState(false)
       const dispatch = useDispatch()
       const {orderData,orderDetails,totalRecords} = useSelector(state=>state.shoppingOrderSlice)
       const {user} = useSelector(state=>state.auth)
      const [page,setCurrentPage] = useState(1)
     const[totalPages,setTotalPages]=useState(0)
     let limit = 5
       useEffect(()=>{
         dispatch(getOrders({page,limit:limit})).then(data=>{
            console.log(data,'order')
            if(data.payload.success){
                console.log(totalRecords)
                setTotalPages(Math.round(data.payload.totalRecords/limit))
                console.log(totalPages)
            }
         })
       },[dispatch,page])
     function handleOrderDetails(currentOrderId){
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
                            <TableHead className="text-right">Order Price</TableHead>
                            <TableHead className="text-left">Order Placed By</TableHead>
                            <TableHead className="text-center">Order Status</TableHead>
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
                            <TableCell className="text-right"> $ {order.totalAmount.toFixed(2)} </TableCell>
                            <TableCell className="text-left"> {order.user.userName}</TableCell>
                            <TableCell className={`text-center`}> {
                                <Badge
                                    className={`${orderStatusColors[order.orderStatus]} px-3 py-1 rounded-full`}
                                >
                                        {displayOrderStatus[order.orderStatus]}
                                  </Badge>
} </TableCell>
                            
                            <TableCell> 
                                                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                                        <Button onClick={()=>{setOpenDialog(true); handleOrderDetails(order._id)} }>View Details
                                                        </Button>
                                                    <AdminOrderDetails orderDetails={orderDetails}/>    
                                                    </Dialog>
                                                   
                                                </TableCell>

                            
                        </TableRow>
                             )
                        })
                     }
                        
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                                   <MyPagination page={page} totalPages={totalPages} setPage={setCurrentPage}/>
               
            </CardFooter>
        </Card>
        : <div>No Order Data Found</div>
    )
}
export default AdminViewOrders