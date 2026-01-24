import { assets } from "@/assets/assets"
import { reSetJobTitle, reSetLocation, setJobTitle, setLocation } from "@/store/search-slice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

function Hero(){
    const [locationValue,setLocationValue] = useState('')
    const [jobValue,setJobValue] = useState('')
    const {jobTitle,jobLocation} = useSelector(state=>state.jobFilterSlice)
    const dispatch = useDispatch()
    function handleFilters(){
         if (locationValue !== '') {
                dispatch(setLocation(locationValue))
            } else {
                dispatch(reSetLocation())
            }

            if (jobValue !== '') {
                dispatch(setJobTitle(jobValue))
            } else {
                dispatch(reSetJobTitle())
            }
    }
    useEffect(() => {

                if (jobTitle === "") {
                    setJobValue("")
                }

                if (jobLocation === "") {
                    setLocationValue("")
                }

                }, [jobTitle, jobLocation])

    return(
        <div className="container 2xl:px-20 mx-auto my-10">
            <div className="bg-gradient-to-r from-purple-800 to to-purple-900 text-white py-16 text-center mx-2 rounded-xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                    Over 10,000+ jobs to apply
                </h2>
                <p className="mb-8 mx-w-xl mx-auto text-sm font-light px-5"> 
                  Your Next Big Carrer Move Starts Here - Explore The Best Opportunities 
                  And Take The First Step ForWard Towards Future
                </p>
                <div className="flex items-center justify-between bg-white rounded text-green-600 max-w-xl pl-4 mx-4 sm:mx-auto"> 
                    <div className="flex items-center">
                        <img className = "h-4 sm:h-5" src={assets.search_icon} alt=""/>
                        <input
                        type="text"
                        placeholder="Search For Jobs"
                        className="max-sm:text-xs p-2 rounded outline-none w-full"
                        onChange={e=>setJobValue(e.target.value)}
                        value={jobValue}
                        />
                    </div>
                     <div  className="flex items-center"> 
                        <img className = "h-4 sm:h-5" src={assets.location_icon} alt=""/>
                        <input
                        type="text"
                        placeholder="Search For Location"
                        className="max-sm:text-xs p-2 rounded outline-none w-full"
                        onChange={e=>setLocationValue(e.target.value)}
                        value={locationValue}
                        />
                    </div>
                    <button onClick={e=>{handleFilters()}} className="bg-blue-600  px-6 py-2 rounded  text-white m-1"> Search</button>
                </div>
            </div>
            <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
                <div className="flex justify-center gap-6 lg:gap-16 flex-wrap ">
                    <p className="font-medium">Trusted By</p>
                    <img className="h-6" src={assets.microsoft_logo} alt=""/>
                    <img className="h-6" src={assets.walmart_logo} alt=""/>
                    <img className="h-6"  src={assets.accenture_logo} alt=""/>
                    <img className="h-6" src={assets.samsung_logo} alt=""/>
                    <img className="h-6"  src={assets.amazon_logo} alt=""/>
                    <img className="h-6" src={assets.adobe_logo} alt=""/>
                </div>
            </div>
        </div>
    )
}
export default Hero