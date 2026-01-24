import { assets, jobsData } from "@/assets/assets"
import Loading from "@/components/loading"
import NavBar from "@/components/navbar"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import kconvert from "k-convert"
import moment  from "moment"
import JobCard from "@/components/jobcard"
import Footer from "@/components/footer"
function ApplyJob(){
const {id} = useParams()
const [jobDetails,setJobDetails] = useState(null)
let fetchJobdetails = {}
useEffect(
    ()=>{
        if(jobsData && jobsData.length>0)
        {
            fetchJobdetails = jobsData.filter(job=>job._id===id)
            fetchJobdetails = fetchJobdetails.length>0?fetchJobdetails[0]:[]
            setJobDetails(fetchJobdetails)
        }
        
    },[id,jobsData]
) 
    return jobDetails?(
        <>
        <NavBar/>
        <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
            <div className="bg-white text-black rounded w-full">
                <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
                    <div  className="flex flex-col md:flex-row items-center">
                        <img className="h-24 bg-white rounded-lg p-4 m-4 max-md:mb-4 border" src={jobDetails.companyId.image} alt=""/>
                        <div className="text-center md:text-left text-neutral-700">
                            <h1 className="text-2xl sm:text-4xl font-medium">
                                {jobDetails.title}
                            </h1>
                            <div className="flex flex-row flex-wrap max-md:justify-center  gap-y-2 gap-6 items-center text-gray-600 mt-2">
                                <span className="flex items-center gap-1">
                                    <img src={assets.suitcase_icon} alt=""/>
                                    {
                                        jobDetails.companyId.name
                                    }
                                </span>
                                <span className="flex items-center gap-1">
                                    <img src={assets.location_icon} alt=""/>
                                    {
                                        jobDetails.location
                                    }
                                </span>
                                 <span className="flex items-center gap-1">
                                    <img src={assets.person_icon} alt=""/>
                                    {
                                        jobDetails.level
                                    }
                                </span>
                                <span className="flex items-center gap-1">
                                    <img src={assets.money_icon} alt=""/>
                                  CTC:  {
                                        kconvert.convertTo(jobDetails.salary)
                                    }
                                </span>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
                        <button className="bg-blue-600 p-2.5 px-10 text-white rounded ">Apply Now</button>
                        <p className="mt-1 text-gray-600">posted {moment(jobDetails.date).fromNow()}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-start">
                <div className="w-full lg:w-2/3">
                    <h2 className="font-bold text-2xl mb-4 text-left">Job Description</h2>
                    <div className="richh-text" dangerouslySetInnerHTML={{__html:jobDetails.description}}>
                    </div>
                    <button className="bg-blue-600 p-2.5 px-10 text-white rounded mt-10 ">Apply Now</button>
                </div>
                <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5 ">
                    <h2>
                        More Jobs From {jobDetails.companyId.name}
                       
                    </h2>
                     {jobsData.filter(jobItem=>jobItem.companyId._id === jobDetails.companyId._id && jobItem._id !== jobDetails._id).slice(0,4).map(
                            (item,index)=>(
                                <JobCard key={index} jobData={item}/>
                            )
                        )}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    ):
    (
        <Loading/>
    )
   
}
export default ApplyJob