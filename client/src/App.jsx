
import { Routes , Route } from 'react-router-dom'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthAction } from './store/auth-slice'
import { useEffect } from 'react'


import Home from './pages/home'
import Applications from './pages/applications'
import ApplyJob from './pages/applyjob'
import AdminDashboard from './pages/dashboard'
import ManageJobs from './pages/managejobs'
import ViewApplications from './pages/viewapplications'
import AddJob from './pages/addjob'
import 'quill/dist/quill.snow.css'

function App() {


  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path="/applications" element={<Applications/>}/>
       <Route path="/apply-job/:id" element={<ApplyJob/>}/>
       <Route path="/dashboard" element={<AdminDashboard/>}>
          <Route path='managejobs' element={<ManageJobs/>}/>
       <Route path='viewapplications' element={<ViewApplications/>}/>
       <Route path='addjob' element={<AddJob/>}/>
       </Route>
       
      </Routes>
    </div>
  )
}

export default App
