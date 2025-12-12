import { Label } from "@radix-ui/react-label"
import { useEffect, useRef } from "react"
import { Input } from "../ui/input"
import { FileIcon, UploadCloud, XIcon } from "lucide-react"
import { Button } from "../ui/button"
import axios from "axios"
import { Skeleton } from "../ui/skeleton"
function ProductUploadImage({
    file,setFile,uploadedUrl,SetUploadedUrl,setImageLoadingState,imageloadingState,isEditMode
}){
    const inputRef = useRef(null)
    function handleFileChange(event){
        console.log(event.target.files)
        const selectedFile = event.target.files[0]
        if(selectedFile){
            setFile(selectedFile)
        }

    }
    function handleDragOver(event){
             event.preventDefault()
    }
    function handleDrop(event){
                event.preventDefault()
                console.log(event.dataTransfer)
                const droppedFile = event.dataTransfer.files[0]
                if(droppedFile){
                    setFile(droppedFile)
                }
    }
    function handleRemoveImage(event){
        event.preventDefault()
        setFile(null)
        if(inputRef.current){
            inputRef.current.value=''
        }
    }
    async function uploadImageToCloudinary(){
        setImageLoadingState(true)
        const imageFormData = new FormData()
        imageFormData.append('my_file',file)
        const imageResult = await axios.post("http://localhost:5000/api/admin/products/upload-image",imageFormData) 
        console.log(imageResult,'image Upload Response')
        if(imageResult.data.success) 
            {
                SetUploadedUrl(imageResult.data.result.url)
                setImageLoadingState(false)
            }
    }
    
    useEffect(()=>{
         if(file!=null){
            uploadImageToCloudinary()
         }
    },[file])
    
    return (
    <div className="w-full max-w-md mx-auto mt-4">
        <Label className="text-lg font-semibold mb-2 block"> Upload Image </Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode?'opacity-60':''} border-2 bordrr-dashed rounded-lg p-4`}>
        <Input 
         type="file" 
         id='image-upload' 
         className='hidden'
         ref={inputRef}
         onChange={handleFileChange}
         disabled={isEditMode}/>
         {
            !file?
            <Label htmlFor="image-upload" className={`flex flex-col items-center justify-center h-32 cursor-pointer ${!isEditMode ? '':'cursor-not-allowed'  }`}>
               <UploadCloud className="w-10 h-10 text-muted-foreground mb-2"/>
               <span>Drag & drop to Upload Image</span>
            </Label>
            :
               imageloadingState ? <Skeleton className='h-10 bg-gray-600'/> :
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <FileIcon className="w-8 text-primary mr-2 h-8"/>
                    </div>
                    <p className="text-sm font-medium">
                        {file.name}
                    </p>
                    <Button variant='ghost' className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                        <XIcon className="w-4 h-4"/>
                        <span className="sr-only">Remove File</span>
                    </Button>    
                  
                </div>
      
         }
         </div>
    </div>
    )

}
export default ProductUploadImage