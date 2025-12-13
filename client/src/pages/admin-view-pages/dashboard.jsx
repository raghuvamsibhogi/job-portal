import ProductUploadImage from "@/components/admin-components/image-upload"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { getFeatureImages, saveImage } from "@/store/common-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function AdminDasdoard(){
    const [imageFile,setImageFile] = useState(null)
    const [uploadedImageUrl,SetUploadedImageUrl] = useState('')
    const [imageloadingState,setImageLoadingState] = useState(false)
    const {imageList} = useSelector(state=>state.imageUploaderSlice)
    const dispatch = useDispatch()
    const {toast} = useToast()
    console.log(uploadedImageUrl,'uploadedImageUrl')
    function handleImageUpload(){
        if(uploadedImageUrl!=''){
          dispatch(saveImage(uploadedImageUrl)).then(data=>{
            if(data.payload.success){
                toast({
                    title:data.payload.message
                })
                setImageFile(null)
                SetUploadedImageUrl('')
                setImageLoadingState(false)
            }
          })
        }
        else{
            toast({
                title:"Upload Image",
                variant:"destructive"
            })
        }
        
    }
    useEffect(
        ()=>{
            console.log('heyyy')
         dispatch(getFeatureImages())
        },[dispatch]
    )
    console.log(imageList,'imageList')
    return(
        <div>
                         <ProductUploadImage file={imageFile}  
                         setImageLoadingState={setImageLoadingState} 
                         setFile={setImageFile} 
                         uploadedUrl={uploadedImageUrl} 
                         SetUploadedUrl={SetUploadedImageUrl} 
                         imageloadingState={imageloadingState}
                         isCustomStyling = {true}
                         />
                         <Button className="mt-5 w-full" onClick={()=>{handleImageUpload()}}>Upload</Button>

        </div>
    )
}
export default AdminDasdoard