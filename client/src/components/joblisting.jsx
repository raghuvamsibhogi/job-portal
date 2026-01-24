import JobMainListing from "./joblistingmain"
import JOblistingSideBar from "./joblistingsidebar"


function JobListing(){
   
    return(
        <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 ">
           <JOblistingSideBar/>
           <JobMainListing/>           
        </div>
    )
}
export default JobListing