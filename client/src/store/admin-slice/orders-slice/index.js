import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    approvalUrl:null,
    isLoading:false,
    orderId:null,
    orderData:[],
    orderDetails:[],
    totalRecords:0
}

export const getOrders = createAsyncThunk('./order/getOrders',async({page,limit})=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}api/admin/orders/getOrders`,
      { params: { page,limit } } 
    ) 
    return response.data
}

)
export const getOrderDetails = createAsyncThunk('./order/getOrderDetails',async(orderId)=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}api/admin/orders/getOrderDetails`,
      { params: { orderId } } 
    ) 
    return response.data
}

)
export const updateOrderStatus = createAsyncThunk('./order/updateOrderStatus',async({orderId,orderStatus} )=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}api/admin/orders/updateOrderStatus`,
      {orderId,orderStatus} 
    ) 
    return response.data
}

)
const adminOrderSlice = createSlice({
    name:"adminOrderSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       
         builder.addCase(getOrders.pending,(state)=>{
                state.isLoading=true
              }).addCase(getOrders.fulfilled,(state,action)=>{
                state.isLoading=false
                state.orderData=action.payload.data;
                state.totalRecords = action.payload.totalRecords
              }).addCase(getOrders.rejected,(state,action)=>{
                state.isLoading=false
                state.orderData=[];
                state.totalRecords = 0

              })
         builder.addCase(getOrderDetails.pending,(state)=>{
                state.isLoading=true
              }).addCase(getOrderDetails.fulfilled,(state,action)=>{
                state.isLoading=false
               state.isLoading=false
                state.orderDetails=action.payload.data;
              }).addCase(getOrderDetails.rejected,(state,action)=>{
                 state.isLoading=false
                state.orderDetails=[];
              })

    }
})
export default adminOrderSlice.reducer