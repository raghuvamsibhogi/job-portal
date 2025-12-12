import { Card, CardHeader } from "@/components/ui/card"
import { capturePayment } from "@/store/shop-slice/orders-slice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

function PaypalReturn(){
    const dispatch = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    console.log(params)
    const payerId  = params.get('PayerID')
    console.log(payerId)
    useEffect(()=>{
         if(payerId){
            const currentOrderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
            dispatch(capturePayment({paymentId:'',payerId:payerId,orderId:currentOrderId})).then(data=>{
                if(data.payload.success){
                         sessionStorage.removeItem('currentOrderId')
                         window.location.href = '/shop/payment-success'
                }
               
            })
         }
    },[payerId,dispatch])
    return(
        <Card>
            <CardHeader>
                Processing payment please wait ....
            </CardHeader>
        </Card>
    )
}
export default PaypalReturn