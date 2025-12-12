import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Label } from "../ui/label"

function AddressCard({addressInfo,handleDeleteFunction,handleEditFunction,setCurrentSelectedAddress,selectedAddressId}){
    console.log('selectedAddressId',selectedAddressId)
    return(
        <div>
            <Card onClick={addressInfo?()=>setCurrentSelectedAddress(addressInfo):null} className={`cursor-pointer ${selectedAddressId?._id == addressInfo._id ? 'border-red-900 border-[4px]' :'border-black'} `}>
                <CardContent className={`grid p-4 gap-4`}>
                    <Label>Address :  {addressInfo.address}</Label>
                    <Label>city:{addressInfo.city}</Label>
                     <Label>Pin Code:{addressInfo.pinCode}</Label>
                    <Label>Phone:{addressInfo.phone}</Label>
                    <Label>Notes:{addressInfo.notes}</Label>
                    

                </CardContent>
                <CardFooter className="p-0 pt-1 pb-1 justify-between">
                    <Button onClick={()=>{handleEditFunction(addressInfo)}}>
                        Edit
                    </Button>
                      <Button onClick={()=>{handleDeleteFunction(addressInfo._id)}}>
                        Delete
                    </Button>
                </CardFooter>
            </Card>
         </div>
    )
}
export default AddressCard