import { productFormDetails } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading:false,
    productReviewList:[]
}
export const addReview = createAsyncThunk('./review/addreview',async({userId,userName,reviewMessage,reviewValue,productId})=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/review/addReview`,{userId,userName,reviewMessage,reviewValue,productId})
    return response.data
})
export const getProductReview = createAsyncThunk('./review/getProductReview',async(productId)=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/review/getProductReviews`,{params:{productId}})
    return response.data
})
const productReviewSlice = createSlice({
    name:'productReview',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addReview.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(addReview.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.productReviewList = action.payload.data
        })
        builder.addCase(addReview.rejected,(state,action)=>{
            state.isLoading=false,
            state.productReviewList = []
        })
        builder.addCase(getProductReview.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(getProductReview.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.productReviewList = action.payload.data
        })
        builder.addCase(getProductReview.rejected,(state,action)=>{
            state.isLoading=false,
            state.productReviewList = []
        })
    }
})
export default productReviewSlice.reducer