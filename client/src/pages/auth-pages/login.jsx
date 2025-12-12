import CommonForm from "@/components/common/form"
import { login} from "@/config"
import { useToast } from "@/hooks/use-toast"
import { loginAction } from "@/store/auth-slice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


function AuthLogin(){
    const intialState = {

        email:"",
        password:""
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {toast} = useToast()

    function onSubmit(event){
       event.preventDefault()
       dispatch(loginAction(formData)).then((data)=>{
        console.log(data)
        if(data.payload.success==1){
           toast({
            title:data.payload.message
           })
          if(data.payload.user.role=="admin"){
            console.log('hey')
            navigate('/admin/dashboard')

          }
          else{
            navigate('/shop/home')
          }
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
  <div className="w-full max-w-md  rounded-2xl bg-white p-8 shadow-lg">
    
    {/* Header */}
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
       Signin
      </h1>
      <p className="mt-2 text-gray-600">
        Dont have Account?
        <Link
          className="ml-2 font-medium text-primary hover:underline"
          to="/auth/register"
        >
          register
        </Link>
      </p>
    
    </div>

    {/* Form */}
    <CommonForm
      formControls={login}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      buttonText="Sign In"
    />
  </div>
</div>

    )
}

export default AuthLogin