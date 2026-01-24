import AppDownload from "@/components/appdownload"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import JobListing from "@/components/joblisting"
import NavBar from "@/components/navbar"

function Home(){
    return(
        <div>
            <NavBar/>
            <Hero/>
            <JobListing/>
            <AppDownload/>
            <Footer/>
        </div>
    )
}
export default Home