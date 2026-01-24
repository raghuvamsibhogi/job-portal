import JobCard from "./jobcard"
import {assets, jobsData} from "../assets/assets"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
function JobMainListing(){
    const[currentPage,setCurrentPage] = useState(1)
    const {jobFilters,jobTitle,jobLocation} = useSelector(state=>state.jobFilterSlice)
    const [filteredJobsData, setFilteredJobsData] = useState(jobsData);
    useEffect(
       ()=> {
        let filterData = jobsData
        if(Object.keys(jobFilters).length !== 0){
            if((jobFilters['category'] && jobFilters['category'].length>0) && (jobFilters['location'] && jobFilters['location'].length>0)){
            filterData = filterData.filter((jobData)=>(jobFilters['category'].includes(jobData['category'])) && (jobFilters['location'].includes(jobData['location']))) 
            }
            else if(jobFilters['category'] && jobFilters['category'].length>0)
            {
            filterData = filterData.filter((jobData)=>(jobFilters['category'].includes(jobData['category']))) 
            }   
            else if(jobFilters['location'] && jobFilters['location'].length>0)
            {
            filterData = filterData.filter((jobData)=>(jobFilters['location'].includes(jobData['location'])))
            }   
        }
        if(jobTitle!='' && jobLocation!=''){
            filterData = filterData.filter((filterItem)=>(filterItem['title'].toLowerCase().includes(jobTitle.toLowerCase())) && (filterItem['location'].toLowerCase().includes(jobLocation.toLowerCase())))
        }
        else if(jobTitle!=''){
            filterData = filterData.filter((filterItem)=>(filterItem['title'].toLowerCase().includes(jobTitle.toLowerCase())))

        }
        else if(jobLocation!=''){
            filterData = filterData.filter((filterItem)=>(filterItem['location'].toLowerCase().includes(jobLocation.toLowerCase())))

        }
         setFilteredJobsData(filterData)
         setCurrentPage(1)
        },[jobFilters,jobsData,jobTitle,jobLocation]
    )
   
   
    return(
        <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
            <h3 className="font-medium text-3xl py-2 " id="job-list">Latest Jobs</h3>
            <p className="mb-8">Get your desired jobs from top companie</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {
                    filteredJobsData && filteredJobsData.length>0?
                    filteredJobsData.slice((currentPage-1)*6,currentPage*6).map((jobData,index)=>(
                        <JobCard key={index} jobData={jobData}/>
                    ))
                    : <h1>No jobs Data Found</h1>
                }
            </div>
            {/*pagination */}
            {filteredJobsData.length>0 && (
                <div className="flex items-center justify-center space-x-2 mt-10">
                    <a key='back' href="#job-list">
                       <img onClick={e=>setCurrentPage(prev=>prev-1)} className={`${currentPage==1?'hidden':''}`} src={assets.left_arrow_icon} alt=""/>
                    </a>   
                       {
                        Array.from({length:Math.ceil(filteredJobsData.length/6)}).map((_,index)=>(
                            <a key={index} href="#job-list">
                                <button onClick={e=>setCurrentPage(index+1)} className={`w-10 h-10 items-center justify-center border border-gray-300 rounded  ${currentPage == index+1?'bg-blue-100 text-blue-500':''}`}>{index+1}</button>
                             </a>   
                        ))
                       }
                    <a key='forward'  href="#job-list">
                       <img onClick={e=>setCurrentPage(prev=>prev+1)} className={`${currentPage==Math.ceil(filteredJobsData.length/6)?'hidden':''}`} src={assets.right_arrow_icon} alt=""/>
                    </a>     
                    
                </div>
            )}
        </section> 

    )
}
export default JobMainListing