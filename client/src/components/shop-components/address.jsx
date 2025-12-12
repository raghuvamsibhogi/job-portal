import { addressFormControls } from "@/config"
import CommonForm from "../common/form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAddress, deleteAddress, getAddress, updateAddress } from "@/store/shop-slice/address-slice"
import AddressCard from "./addresscard"
import { toast } from "@/hooks/use-toast"
const intialFormData = {
    address:"",
    pinCode:"",
    notes:"",
    city:"",
    phone:"",
}

function Address({setCurrentSelectedAddress,selectedAddressId}){
    const [formData,setFormData] = useState(intialFormData)
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.auth)
    const {addressList} = useSelector(state=>state.shoppingAddressSlice)
    const [currenteEditAddressId,setcurrenteEditAddressId] = useState(null)
    function handleManageAddress(event){
        event.preventDefault()
        console.log(formData)
        if(addressList.length>=3){
            toast({
                title:"you can add upto three addresses",
                variant:"destructive"
            })

        }
        else{
               dispatch(addAddress({userId:user.id,address:formData.address,notes:formData.notes,city:formData.city,phone:formData.phone,pinCode:formData.pinCode})).then(
            data=>{
                console.log(data)
                if(data.payload.success){
                    dispatch(getAddress(user.id))
                    setFormData(intialFormData)
                }
                // 
            }
        )
        }
        

    }
     function handleEditAddress(event){
        event.preventDefault()
        console.log(formData)
        dispatch(updateAddress({userId:user.id,address:formData.address,notes:formData.notes,city:formData.city,phone:formData.phone,pinCode:formData.pinCode,addressId:formData._id})).then(
            data=>{
                console.log(data)
                if(data.payload.success){
                    toast({
                        title:"Address Updated Successfully"
                         })
                    dispatch(getAddress(user.id))
                    setFormData(intialFormData)
                    setcurrenteEditAddressId(null)
                }
                // 
            }
        )

    }
    function handleDeleteFunction(getCurrentAddressId){
        dispatch(deleteAddress({userId:user.id,addressId:getCurrentAddressId})).then(
            data=>{
                if(data.payload.success){
                    dispatch(getAddress(user.id))
                    toast({
                        title:"Address Deleted Successfully"
                         })
                }
            }
        )
    }
    function handleEditFunction(getCurrentAddress){
        console.log(getCurrentAddress)
       setFormData(getCurrentAddress)
       setcurrenteEditAddressId(getCurrentAddress._id)
    }
   
    useEffect(()=>{
        dispatch(getAddress(user.id))
    },[dispatch])
    console.log(currenteEditAddressId)
    const isFormValid = Object.values(formData).every(
  (value) => value !== "" && value !== null
);
    return(
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm-grid-cols-2 md:grid-cols-3 gap-2 ">
                {
                    addressList && addressList.length>0 ? addressList.map(singleAddressItem=> <AddressCard key={singleAddressItem._id} addressInfo={singleAddressItem} handleDeleteFunction={handleDeleteFunction} handleEditFunction={handleEditFunction} setCurrentSelectedAddress={setCurrentSelectedAddress} selectedAddressId={selectedAddressId}  />):null
                }
            </div>
            <CardHeader>
                <CardTitle>{currenteEditAddressId!=null?'Edit Address':'Add New Address'}</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
                <CommonForm formControls={addressFormControls} 
                            buttonText={currenteEditAddressId!=null?'Edit':'Add'}
                            onSubmit={currenteEditAddressId!=null?handleEditAddress:handleManageAddress} 
                            setFormData={setFormData} 
                            formData={formData}
                            disabled={!isFormValid} />
            </CardContent>
        </Card>
    )
}
export default Address