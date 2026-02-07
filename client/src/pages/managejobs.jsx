import { manageJobsData } from "@/assets/assets"
import moment from "moment"
import { useNavigate } from "react-router-dom"
function ManageJobs(){
    const navigate = useNavigate()
    return (
        <div className="container p-4 w-full">
            <div className="mb-5 flex justify-end">
                <button onClick={e=>navigate("/dashboard/addjob")} className="bg-black text-white py-2 px-4 rounded-full">Add New Job</button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 max-sm:text-small">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
                            <th className="py-2 px-4 border-b text-left">Job Title</th>
                            <th className="py-2 px-4 border-b text-left  max-sm:hidden">Date</th>
                            <th className="py-2 px-4 border-b text-left  max-sm:hidden">Locations</th>
                            <th className="py-2 px-4 border-b text-center">Applicants</th>
                            <th className="py-2 px-4 border-b text-left">Visible</th>
                        </tr>    
                    </thead>
                    <tbody>
                        {manageJobsData.length>0 &&(
                                          manageJobsData.map((manageJobData,index)=>(
                                            <tr key={index} className="text-gray-700">
                                            <td className="py-2 px-4 text-center border-b  max-sm:hidden">{index+1}</td>
                                          
                                            <td className="py-2 px-4 border-b">{manageJobData.title}</td>
                                            <td className="py-2 px-4 border-b max-sm:hidden">{moment(manageJobData.date).format('ll')}</td>
                                            <td className="py-2 px-4 border-b max-sm:hidden">{manageJobData.location}</td>
                                            <td className="py-2 px-4 border-b">{manageJobData.applicants}</td>
                                            <td className="py-2 px-4 border-b" ><input className="scale-125 ml-4" type="checkbox"/></td>

                                            </tr>
                                          ))  
                                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ManageJobs