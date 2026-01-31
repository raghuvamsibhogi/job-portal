
import { Routes , Route } from 'react-router-dom'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthAction } from './store/auth-slice'
import { useEffect } from 'react'


import Home from './pages/home'
import Applications from './pages/applications'
import ApplyJob from './pages/applyjob'

function App() {


  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path="/applications" element={<Applications/>}/>
       <Route path="/apply-job/:id" element={<ApplyJob/>}/>
      </Routes>
    </div>
  )
}

export default App
