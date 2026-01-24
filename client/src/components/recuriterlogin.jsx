import { assets } from "@/assets/assets"
import { useState } from "react"

function RecuriterLogin(){
    const [state,setState] = useState('Login')
    const [name,setName] = useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const [image , setImage] = useState(false)
    const [isTextDataSubmitted , setIsTextDataSubmitted] = useState(false)
    console.log("heyyyyy")
    return(
        
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <form className="relative bg-white p-10 rounded-xl text-slate-500"> 
                <h1 className="text-center text-2xl text-neutral-700 font-md">
                   Recuriter {state}

                </h1>
                <p className="text-sm">
                    Welcome back! please sign in to continue
                </p>
                <>
                {
                    state !== 'Login' &&(
                            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                                <img src={assets.person_icon} alt=""/>
                                <input className="outline-none text-sm" type="text" placeholder="Company Name" required onChange={e=>setName(e.target.value)} value={name}/>
                            </div>
                    )
                }
                
                 <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5" >
                    <img src={assets.email_icon} alt=""/>
                    <input className="outline-none text-sm" type="email" placeholder="Email" required onChange={e=>setEmail(e.target.value)} value={email}/>

                </div>
                 <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                    <img src={assets.lock_icon} alt=""/>
                    <input className="outline-none text-sm" type="text" placeholder="Password" required onChange={e=>setPassword(e.target.value)} value={password}/>

                </div>
                <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgor password?</p>
                </>
                <button className="bg-blue-600 w-full text-white py-2 rounded-full">
                    {state=='Login'?'Login':'Create Account'}
                </button>
                {
                    state==='Login'?<p className="mt-5 text-left">Don't have an account? <span className="cursor-pointer text-blue-600" onClick={e=>setState("Sign Up")}>Sign Up</span></p> : <p className="mt-5 text-center">Already have an account? <span className="cursor-pointer  text-blue-600 " onClick={e=>setState("Login")}>Login</span> </p>
                }
                
                
            </form>
        </div>
    )
}
export default RecuriterLogin