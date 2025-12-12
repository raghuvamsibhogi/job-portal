import AdminProductTile from "@/components/admin-components/admin-product-tile"
import ProductUploadImage from "@/components/admin-components/image-upload"
import CommonForm from "@/components/common/form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { productFormDetails } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { addProducttrunk, deleteProducttrunk, editProducttrunk, getProducttrunk } from "@/store/admin-slice/product-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


function AdminProducts(){
      const intialState = {
       image:null,
        title:"",
        description:"",
        category:"",
        brand:"",
        price:"",
        sales_price:"",
        total_stock:""
    }
   
    const [formProductData,setFormProductData]=useState(intialState)
    const [openCreateProductDialog,setOpenCreateProductDialog] = useState(false)
     const [imageFile,setImageFile] = useState(null)
     const [uploadedImageUrl,SetUploadedImageUrl] = useState('')
     const [imageloadingState,setImageLoadingState] = useState(false)
     const dispatch = useDispatch()
     const {productList} = useSelector(state=>state.adminProducts)
     const {toast} = useToast()
     const [currentEditProductId,setCurrentEditProductId] = useState(null)
     const isEditMode = currentEditProductId!=null?true:false
     console.log(currentEditProductId,'currentEditProductId')
      function onProductSubmit(event){
        event.preventDefault()
        currentEditProductId!=null?
        dispatch(editProducttrunk({id : currentEditProductId,formData:formProductData})).then(
            (data)=>{
                      console.log(data,"add_product")
                if(data.payload.success)
                {
                        dispatch(getProducttrunk())
                        setCurrentEditProductId(null)
                        setFormProductData(intialState)
                        setOpenCreateProductDialog(false)
                        toast({
                            title:data.payload.message
                        })

                }
                else{
                   toast({
                            title:data.payload.message,
                            variant:"destructive"
                        }) 
                }
            }
        ):
        dispatch(addProducttrunk(
            {
                ...formProductData,
                image:uploadedImageUrl
            }
        )).then((data)=>
            {
                   console.log(data,"add_product")
                if(data.payload.success)
                {
                        dispatch(getProducttrunk())
                        setImageFile(null)
                        setFormProductData(intialState)
                        setOpenCreateProductDialog(false)
                        toast({
                            title:data.payload.message
                        })

                }
                else{
                   toast({
                            title:data.payload.message,
                            variant:"destructive"
                        }) 
                }
               

            }
    )

    }
    useEffect(()=>{
      dispatch(getProducttrunk())
    },[dispatch])
    function handleDelete(getCurrentProductId){
        dispatch(deleteProducttrunk({id:getCurrentProductId})).then(
            (data)=>{
                 if(data.payload.success)
                {
                        dispatch(getProducttrunk())
                        toast({
                            title:data.payload.message
                        })

                }
                else{
                   toast({
                            title:data.payload.message,
                            variant:"destructive"
                        }) 
                }
            }
        )
    }
  
    console.log(productList,'product list')
    console.log(formProductData)
     const { image, ...fieldsToValidate } = formProductData;

const isFormValid = Object.values(fieldsToValidate).every(
  (value) => value !== "" && value !== null && value!=0
);
    return(
       <>
       <div>
        <Button onClick={()=>{setOpenCreateProductDialog(true)}} className="mb-5 flex justify-end">
           Add New Product
        </Button>
       </div >
       <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
           {
            productList && productList.length >0 ?
            productList.map(productItem=>
            <AdminProductTile key={productItem._id} handleDelete={handleDelete} product={productItem} setFormProductData={setFormProductData} setCurrentEditProductId={setCurrentEditProductId} setOpenCreateProductDialog={setOpenCreateProductDialog}/>) : null
           }
       </div>
       <Sheet open={openCreateProductDialog} onOpenChange={()=>{setOpenCreateProductDialog(false),setCurrentEditProductId(null),setOpenCreateProductDialog(false),setFormProductData(intialState)}}>
         <SheetContent side='right' className='overflow-auto' aria-describedby={undefined}>
            <SheetHeader>
                <SheetTitle>
                    {
                        currentEditProductId!=null ? 'Edit Product' : 'Add New Product'
                    }
                    
                </SheetTitle>
            </SheetHeader>
             <ProductUploadImage file={imageFile} isEditMode = {isEditMode} setImageLoadingState={setImageLoadingState} setFile={setImageFile} uploadedUrl={uploadedImageUrl} SetUploadedUrl={SetUploadedImageUrl} imageloadingState={imageloadingState}/>
            <div className="py-6">
               
               <CommonForm
      formControls={productFormDetails  }
      formData={formProductData}
      setFormData={setFormProductData}
      onSubmit={onProductSubmit}
      buttonText={currentEditProductId!=null?'Edit':'Add'}
      disabled = {!isFormValid}
    />
          </div>
         </SheetContent>
          
       </Sheet>
       </>
    )
}
export default AdminProducts