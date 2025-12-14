import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    cartItems : [],
    isLoading: false
}
export const addCart = createAsyncThunk('cart/addCart',async({userId,productId,quantity})=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}api/shop/cart/addCartItem`,{
        userId,productId,quantity
    })
    return response.data
})
export const updateCart = createAsyncThunk('cart/updateCart',async({userId,productId,quantity})=>{
    const response = await axios.put(`${import.meta.env.VITE_API_URL}api/shop/cart/updateCartItem`,{
        userId,productId,quantity
    })
    return response.data
})
export const deleteCart = createAsyncThunk('cart/deleteCart',async({userId,productId})=>{
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}api/shop/cart/deleteCartItem/${userId}/${productId}`)
    return response.data
})
export const getCart = createAsyncThunk('cart/getCart',async({userId})=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}api/shop/cart/getCartItem/${userId}`)
    return response.data
})
export const checkQuantity = createAsyncThunk('cart/checkQuantity',async({userId})=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}api/shop/cart/checkQuantity`,
        { params: { productId,quantity } } 
    )
    return response.data
})
const shoppingCartSlice = createSlice({
    name:'shoppingCart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
          builder.addCase(addCart.pending,(state)=>{
                    state.isLoading=true
                }).addCase(addCart.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.cartItems = action.payload.data
                }).addCase(addCart.rejected,(state,action)=>{
                    state.isLoading=false
                    state.cartItems = []
                })
         builder.addCase(updateCart.pending,(state)=>{
                    state.isLoading=true
                }).addCase(updateCart.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.cartItems = action.payload.data
                }).addCase(updateCart.rejected,(state,action)=>{
                    state.isLoading=false
                    state.cartItems = []
                })
         builder.addCase(deleteCart.pending,(state)=>{
                    state.isLoading=true
                }).addCase(deleteCart.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.cartItems = action.payload.data
                }).addCase(deleteCart.rejected,(state,action)=>{
                    state.isLoading=false
                    state.cartItems = []
                })      
        builder.addCase(getCart.pending,(state)=>{
                    state.isLoading=true
                }).addCase(getCart.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.cartItems = action.payload.data
                }).addCase(getCart.rejected,(state,action)=>{
                    state.isLoading=false
                    state.cartItems = []
                })                   
    }

})
export default shoppingCartSlice.reducer