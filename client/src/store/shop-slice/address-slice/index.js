import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    addressList : [],
    isLoading: false
}
export const addAddress = createAsyncThunk('address/addAddress',async({userId,address,city,phone,pinCode,notes})=>{
    const response = await axios.post(`{import.meta.env.VITE_API_URL}/api/shop/address/addaddress`,{
        userId,address,city,phone,pinCode,notes
    })
    return response.data
})
export const updateAddress = createAsyncThunk('cart/updateAddress',async({userId,address,city,phone,pinCode,notes,addressId})=>{
    const response = await axios.put(`${import.meta.env.VITE_API_URL}api/shop/address/updateAddress/${userId}/${addressId}`,{
        userId,address,city,phone,pinCode,notes
    })
    return response.data
})
export const deleteAddress = createAsyncThunk('cart/deleteAddress',async({userId,addressId})=>{
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}api/shop/address/deleteAddress/${userId}/${addressId}`)
    return response.data
})
export const getAddress = createAsyncThunk('cart/getAddress',async(userId)=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}api/shop/address/getAddress/${userId}`)
    return response.data
})
const shoppingAddressSlice = createSlice({
    name:'shoppingAddress',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
          builder.addCase(addAddress.pending,(state)=>{
                    state.isLoading=true
                }).addCase(addAddress.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.addressList = action.payload.data
                }).addCase(addAddress.rejected,(state,action)=>{
                    state.isLoading=false
                    state.addressList = []
                })
         builder.addCase(updateAddress.pending,(state)=>{
                    state.isLoading=true
                }).addCase(updateAddress.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.addressList = action.payload.data
                }).addCase(updateAddress.rejected,(state,action)=>{
                    state.isLoading=false
                    state.addressList = []
                })
         builder.addCase(deleteAddress.pending,(state)=>{
                    state.isLoading=true
                }).addCase(deleteAddress.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.addressList = action.payload.data
                }).addCase(deleteAddress.rejected,(state,action)=>{
                    state.isLoading=false
                    state.addressList = []
                })      
        builder.addCase(getAddress.pending,(state)=>{
                    state.isLoading=true
                }).addCase(getAddress.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.addressList = action.payload.data
                }).addCase(getAddress.rejected,(state,action)=>{
                    state.isLoading=false
                    state.addressList = []
                })                   
    }

})
export default shoppingAddressSlice.reducer