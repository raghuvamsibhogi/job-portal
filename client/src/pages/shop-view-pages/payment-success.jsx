import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

function PaymentSuccess(){
   const navigate = useNavigate()


  return( <Card className="p-10">
              <CardHeader className="p-0" >
                <span>Payment is Successfull</span>
              </CardHeader>
             <Button className="mt-5 mb-5" onClick={()=>navigate('/shop/account')} >
                  View Orders
                </Button>
          </Card>
  )
}
export default PaymentSuccess