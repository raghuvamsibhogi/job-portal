import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isloading:true,
    productList:[]
}
export const addProducttrunk = createAsyncThunk("/admin/products/addProduct",
    async (formData)=>{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add-product`
            ,formData
            ,
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )
        return response.data
    })

export const editProducttrunk = createAsyncThunk("/admin/products/updateProduct",
    async ({id,formData})=>{
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/update-product/${id}`
            ,formData
            ,
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )
        return response.data
    }
)

export const deleteProducttrunk = createAsyncThunk("/admin/products/deleteProduct",
    async ({id})=>{
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete-product/${id}`
           
        )
        return response.data
    }
)
export const getProducttrunk = createAsyncThunk("/admin/products/getProducts",
    async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get-products`
        )
        return response.data
    }
)
const adminProductSlice = createSlice({
    name:"adminProducts",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getProducttrunk.pending,(state)=>{
            state.isloading=true
        }).addCase(getProducttrunk.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isloading=false
            state.productList = action.payload.data
        }).addCase(getProducttrunk.rejected,(state,action)=>{
            state.isloading=false
            state.productList = []
        })

    }
})
export default adminProductSlice.reducer