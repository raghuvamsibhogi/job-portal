import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading:false,
    searchProductList:[]
}
 export const searchProduct = createAsyncThunk('/shop/searchProduct',async(keyword)=>
    {
     const response = await axios.get('http://localhost:5000/api/shop/search/searchProduct',{params:{keyword}})
     return response.data
 })
 const searchProductSlice = createSlice({
    name:"searchProduct",
    initialState,
    reducers:{
        resetSearchResults:(state)=>{
            state.searchProductList=[]
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(searchProduct.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(searchProduct.fulfilled,(state,action)=>{
            console.log(action)
            state.isLoading=false
            state.searchProductList = action.payload.data
        })
        builder.addCase(searchProduct.rejected,(state)=>{
            state.isLoading = false
            state.searchProductList=[]
        })
    }
 })
 export const {resetSearchResults} = searchProductSlice.actions
 export default searchProductSlice.reducer