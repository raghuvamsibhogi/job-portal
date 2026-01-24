import { assets } from "@/assets/assets"
import { reSetJobTitle, reSetLocation, setJobFilter } from "@/store/search-slice"
import { useDispatch, useSelector } from "react-redux"
import {JobCategories,JobLocations} from "../assets/assets"
import { useState } from "react"
function JOblistingSideBar(){
     const {jobTitle,jobLocation,jobFilters} = useSelector(state=>state.jobFilterSlice)
     const [filters,setFilters] =useState({})
     const dispatch = useDispatch()
     const [isShowFilter,setIsShowFilter] = useState(false)
    function handleFilters(getCurrentOption, getSectionId) {
            let copyFilters = { ...filters }

            if (!copyFilters[getSectionId]) {
                // section does not exist
                copyFilters[getSectionId] = [getCurrentOption]
            } else {
                const exists = copyFilters[getSectionId].includes(getCurrentOption)

                copyFilters[getSectionId] = exists
                ? copyFilters[getSectionId].filter(item => item !== getCurrentOption)
                : [...copyFilters[getSectionId], getCurrentOption]
                
                }
                setFilters(copyFilters)
                dispatch(setJobFilter(copyFilters)) // ✅ use updated value
  
}
    return(
         <div className="w-full lg:w-1/4 bg-white px-4">
             {(jobTitle && jobTitle !== "") || (jobLocation && jobLocation !== "") ? (
                    <>
                        <h3 className="font-medium text-lg mb-4">Current Search</h3>
                        <div className="mb-4 text-gray-600">
                         {jobTitle && jobTitle !== "" && (
                        <span className="inline-flex items-center gap-2.5 bg-blue-50 border-blue-200 px-4 py-1.5 rounded">{jobTitle}
                         <img onClick={e=>dispatch(reSetJobTitle())} className="cursor-pointer" src={assets.cross_icon} alt=""/>
                        </span>
                        
                        )}

                        {jobLocation && jobLocation !== "" && (
                        <span  className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border-red-200 px-4 py-1.5 rounded">{jobLocation}
                         <img onClick={e=>dispatch(reSetLocation())} className="cursor-pointer" src={assets.cross_icon} alt=""/>
                        </span>
                        )}
                        </div>
                       
                    </>
           ) : null}
           <button onClick={e=>setIsShowFilter(prev=>!prev)} className="px-6 py-1.5 rounded border border-gray-400 lg:hidden">
            {isShowFilter?"close":"Filters"}
           </button>
           <div className={isShowFilter?'':'max-lg:hidden'}>
                <h4 className="font-medium text-lg py-4 pt-14">Search By Categories</h4>
                <ul className="space-y-4 text-gray-600">
                {
                    JobCategories.map((category,index)=>(
                        
                    <li onChange={e=>handleFilters(category,'category')}  className="flex gap-3 items-center" key={index}>
                        <input className="scale-125" type="checkbox" id="" name=""/>
                        {category}
                    </li>
                        
                    ))
                }
                </ul>
            </div>
            <div className={isShowFilter?'':'max-lg:hidden'}>
                <h4 className="font-medium text-lg py-4">Search By Locations</h4>
                <ul className="space-y-4 text-gray-600">
                {
                    JobLocations.map((location,index)=>(
                        
                    <li onChange={e=>handleFilters(location,'location')} className="flex gap-3 items-center" key={index}>
                        <input className="scale-125" type="checkbox" id="" name=""/>
                        {location}
                    </li>
                        
                    ))
                }
                </ul>
           </div>
          </div>
    )
}
export default JOblistingSideBar