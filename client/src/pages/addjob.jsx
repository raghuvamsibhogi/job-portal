import { use, useEffect, useRef, useState } from "react"
import Quill from "quill"
import { JobCategories,JobLocations } from "@/assets/assets"

function AddJob(){
    const [title,setTitle] = useState('')
    const [locaiton,setLocation] = useState('Bengalore')
    const [category,setCategory] = useState('Programming')
    const [level,setlevel] = useState('Beginner Level')
    const [salary,setSalary] = useState(0)
    const editorRef = useRef(null)
    const quillRef = useRef(null)
    useEffect(
        ()=>{
          if(!quillRef.current && editorRef.current){
            quillRef.current = new Quill(editorRef.current,{
                theme:'snow'
            })
          }
        },[]
    )
    return (
    <form className="containter p-4 flex flex-col w-full items-start gap-3">
        <div className="w-full ">
            <p className="mb-2 text-left">Job Title</p>
            <input className="w-full max-w-lg px-3 py-2 border-2 border-gray-300" type="text" onChange={e=>setTitle(e.target.value)} placeholder="Type here" value={title} required/>
        </div>
        <div className="w-full max-w-lg">
            <p className="my-2 text-left">Job Description</p>
            <div ref={editorRef}>

            </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8"> 
            <div>
                <p className="mb-2 text-left">Job Category</p>
                <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={e=>setCategory(e.target.value)}>
                     {JobCategories.map((cat,index)=>
                     (
                     <option key={index} value={cat}>{cat}</option>

                     ))
                     }
                </select>
            </div>
          
            <div>
                <p className="mb-2 text-left">Job Location</p>
                <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={e=>setLocation(e.target.value)}>
                     {JobLocations.map((loc,index)=>
                     (
                     <option key={index} value={loc}>{loc}</option>

                     ))
                     }
                </select>
            </div>
            <div>
                <p className="mb-2 text-left">Job Level</p>
                <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={e=>setlevel(e.target.value)}>
                     <option value="Beginner Level">Beginner Level</option>
                     <option value="Intermediate Level">Intermediate Level</option>
                     <option value="Senior Level">Senior Level</option>
                </select>
            </div>
        </div>
        <div>
            <p className="text-left mb-2">Salary</p>
             <input min={0} className="w-full max-w-lg px-3 py-2 border-2 border-gray-300" type="number" placeholder="2500" onChange={e=>setSalary(e.target.value)} value={salary}/>
        </div>
        <button className="w-28 py-3 mt-4 bg-black text-white rounded">Add</button>
    </form>
)
}
export default AddJob