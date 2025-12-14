import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    approvalUrl:null,
    isLoading:false,
    orderId:null,
    orderData:[],
    orderDetails:[]
}
export const createNewOrder = createAsyncThunk('./order/createNewOrder',async(orderData)=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/orders/create`,orderData) 
    console.log(response)
    return response.data
}

)
export const capturePayment = createAsyncThunk('./order/capturePayment',async({paymentId,payerId,orderId})=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/orders/capture`,{
      paymentId,payerId,orderId
    }) 
    return response.data
}

)
export const getOrders = createAsyncThunk('./order/getOrders',async(userId)=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/orders/getOrders`,
      { params: { userId } } 
    ) 
    return response.data
}

)
export const getOrderDetails = createAsyncThunk('./order/getOrderDetails',async(orderId)=>{
  console.log(orderId)
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/orders/getOrderDetails`,
      { params: { orderId } } 
    ) 
    return response.data
}

)
const shoppingOrderSlice = createSlice({
    name:"shoppingOrderSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
         builder.addCase(createNewOrder.pending,(state)=>{
                state.isLoading=true
              }).addCase(createNewOrder.fulfilled,(state,action)=>{
                state.isLoading=false
                state.approvalUrl=action.payload.approvalUrl;
                state.orderId=action.payload.orderId; 
                sessionStorage.setItem('currentOrderId',JSON.stringify(action.payload.orderId))
              }).addCase(createNewOrder.rejected,(state,action)=>{
                state.approvalUrl=false
                state.approvalUrl=null;
                state.orderId=null 
              })
         builder.addCase(getOrders.pending,(state)=>{
                state.isLoading=true
              }).addCase(getOrders.fulfilled,(state,action)=>{
                state.isLoading=false
                state.orderData=action.payload.data;
              }).addCase(getOrders.rejected,(state,action)=>{
                state.isLoading=false
                state.orderData=[];
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
export default shoppingOrderSlice.reducer