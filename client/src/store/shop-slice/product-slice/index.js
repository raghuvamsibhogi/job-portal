import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isloading:true,
    productList:[],
    productDetails:null,
    totalRecords:0
}

export const getShopProducttrunk = createAsyncThunk("/shop/products/getProducts",
    async ({filterParams,sortParams,page,limit})=>{
        const query= new URLSearchParams({
            ...filterParams,
            sortBy:sortParams,
            page:page,
            limit:limit
        })
        console.log(query)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/fetchProducts?${query}`
        )
        return response.data
    }
)
export const getShopProductDetailstrunk = createAsyncThunk("/shop/products/getProductsDetails",
    async (id)=>{
     
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/getProductsDetails/${id}`
        )
        return response.data
    }
)
const shopProductsSlice = createSlice({
    name:"shopProducts",
    initialState,
    reducers:{
      setProductDetails : (state)=>{
       state.productDetails = null
      }
    },
    extraReducers:(builder)=>{
        builder.addCase(getShopProducttrunk.pending,(state)=>{
            state.isloading=true
        }).addCase(getShopProducttrunk.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isloading=false
            state.productList = action.payload.data
            state.totalRecords = action.payload.totalRecords
        }).addCase(getShopProducttrunk.rejected,(state,action)=>{
            state.isloading=false
            state.productList = []
            state.totalRecords = 0
        })
        builder.addCase(getShopProductDetailstrunk.pending,(state)=>{
            state.isloading=true
        }).addCase(getShopProductDetailstrunk.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isloading=false
            state.productDetails = action.payload.data
        }).addCase(getShopProductDetailstrunk.rejected,(state,action)=>{
            state.isloading=false
            state.productDetails = null
        })

    }
})
export const {setProductDetails} = shopProductsSlice.actions
export default shopProductsSlice.reducer