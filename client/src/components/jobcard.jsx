import { assets } from "@/assets/assets"
import { useNavigate } from "react-router-dom"

function JobCard({jobData}){
    const navigate = useNavigate()
    return(
        <div className="border p-6 shadow rounded">
            <div className="flex justify-between items-center">
                 <img
                 src={assets.company_icon}
                 alt=""
                 className="h-8"
                 />
            </div>
            <h4 className="font-medium text-xl mt-2">{jobData.title}</h4>
            <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">{jobData.location}</span>
                <span className="bg-red-50-50 border border-red-200 px-4 py-1.5 rounded">{jobData.level}</span>
            </div>
            <p className="text-gray-500 text-sm mt-4" dangerouslySetInnerHTML={{__html:jobData.description.slice(0,150)}}></p>
            <div className="flex mt-4 gap-4 text-sm">
                <button onClick={e=>navigate(`/apply-job/${jobData._id}`)} className="bg-blue-600 text-white px-4 py-2 rounded">Apply Now</button>
                <button onClick={e=>navigate(`/apply-job/${jobData._id}`)} className="text-gray-500 border border-gray-500 rounded px-4 py-2">Learn More</button>
            </div>
        </div>
    )
}
export default JobCard