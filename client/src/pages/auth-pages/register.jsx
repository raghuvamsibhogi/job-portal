import CommonForm from "@/components/common/form"
import { register } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { registerAction } from "@/store/auth-slice"
import { Title } from "@radix-ui/react-toast"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"



function AuthRegister(){

    const intialState = {
        userName:"",
        email:"",
        password:""
    }
    const dispatch = useDispatch()
const navigate = useNavigate()
const {toast} = useToast()
    function onSubmit(event){
      event.preventDefault()
      dispatch(registerAction(formData)).then((data)=>
        {console.log(data)
          if(data.payload.success==1){
            toast({
              title:data.payload.message
            })
            navigate('/auth/login')
          }
          else{
             toast({
              title:data.payload.message,
               variant:"destructive"
            })
          }
        })

    }
    const [formData,setFormData]=useState(intialState)
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
  <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
    
    {/* Header */}
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Create New Account
      </h1>
      <p className="mt-2 text-gray-600">
        Already have an account?
        <Link
          className="ml-2 font-medium text-primary hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </p>
    </div>

    {/* Form */}
    <CommonForm
      formControls={register}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      buttonText="Sign Up"
    />
  </div>
</div>

    )
}
export default AuthRegister