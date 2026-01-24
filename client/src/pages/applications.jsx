import { assets,jobsApplied } from "@/assets/assets"
import Footer from "@/components/footer"
import NavBar from "@/components/navbar"
import moment from "moment"
import { useState } from "react"

function Applications(){
    const [isEdit,setIsEdit] = useState(false)
    const [resume,setResume] = useState(null)
    return(
        <>
        <NavBar/>
        <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 ">
            <h2 className="text-xl font-semibold text-left ">Your Resume</h2>
            <div className=" flex gap-2 mb-6 mt-3 ">
                {
                    isEdit? 
                    <>
                    <label htmlFor="resumeUpload" className="flex items-center">
                        <p className="bg-blue-100 text-blue-500 px-4 py-2 rounded-lg mr-2">Select Resume</p>
                        <input id="resumeUpload" onChange={e=>e.target.files[0]} accept="application/pdf" type="file" hidden
                        
                        />
                        <img src={assets.profile_upload_icon}/>
                        <button onClick={()=>setIsEdit(false)} className="bg-green-100 border border-green-400 ml-2 px-4 py-2 rounded-lg">Save</button>
                     </label>
                     
                    </>
                    :
                    <div className="flex gap-2">
                        <a className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg" href="">
                          Resume
                        </a>
                        <button className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2" onClick={()=>{setIsEdit(true);}}>Edit</button>
                    </div>  
                }
            </div>
            {
               jobsApplied && jobsApplied.length>0?<><h2 className="text-xl font-semibold mb-4 text-left">
                Jobs Applied
            </h2>
            <table className="w-full border bg-white rounded-lg">
                <thead>
                    <tr>
                        <th className="py-3 px-4 border-b text-left">Company</th>
                        <th className="py-3 px-4 border-b text-left">Job Title</th>
                        <th className="py-3 px-4 border-b text-left max-sm:hidden">Location</th>
                        <th className="py-3 px-4 border-b text-left max-sm:hidden">Date</th>
                        <th className="py-3 px-4 border-b text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        jobsApplied.map(item=>(
                            <tr>
                                <td className="flex px-4 py-3 items-center gap-2 border-b">
                                    <img className="w-8 h-8" src={item.logo} alt=""/>
                                    {item.company}</td>
                                <td className="py-3 px-4 border-b text-left">{item.title}</td>
                                <td className="py-3 px-4 border-b text-left  max-sm:hidden">{item.location}</td>
                                <td className="py-3 px-4 border-b text-left  max-sm:hidden">{moment(item.date).format('ll')}</td>
                                <td className="py-3 px-4 border-b text-left">
                                   <span className={`${item.status === 'Accepted'?'bg-green-100':item.status === 'Rejected'?'bg-red-100':'bg-blue-100'} px-4 py-1.5 rounded` }>{item.status}</span> 
                                    </td>
                            </tr>
                           
                        ))
                    }
                </tbody>
            </table>
            </>:<div>
                no data found
                </div>
                
            }
            
        </div>
        <Footer/>
        </>
    )
}
export default Applications