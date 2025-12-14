import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoading : true,
    imageList : []
}
export const saveImage = createAsyncThunk('/common/saveImage',async(imageUrl)=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}api/common/saveImage`,{
        image:imageUrl
    })
    return response.data
})
export const getFeatureImages = createAsyncThunk('/common/getFeaturImage',async()=>{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/common/getImages`
    )
    return response.data
})
const imageUploaderSlice = createSlice({
    name:"imageUploader",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getFeatureImages.pending,(state)=>{
            state.isLoading=true
        })
         builder.addCase(getFeatureImages.fulfilled,(state,action)=>{
            state.isLoading=false
            state.imageList=action.payload.data
        })
         builder.addCase(getFeatureImages.rejected,(state)=>{
            state.isLoading=false
            state.imageList=[]
        })
    }
})
export default imageUploaderSlice.reducer