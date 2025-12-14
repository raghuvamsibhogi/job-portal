// const { createSlice } = require("@reduxjs/toolkit");
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LogIn } from "lucide-react";
const initialState = {
    isAuthenticated:false,
    isloading:true,
    user:null

}
export const registerAction = createAsyncThunk('/auth/register',
  async(formData)=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}api/auth/register`,formData,{
      withCredentials:true
    }) 
    return response.data
  }
)
export const loginAction = createAsyncThunk('/auth/login',
  async(formData)=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}api/auth/login`,formData,{
      withCredentials:true
    }) 
    return response.data
  }
)
export const logOutAction = createAsyncThunk('/auth/logout',
  async(formData)=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}api/auth/logout`,{},{
      withCredentials:true}) 
    return response.data
  }
)
export const checkAuthAction = createAsyncThunk('/auth/checkAuth',
  async(formData)=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}api/auth/check-auth`,{
      withCredentials:true,
      headers:{
        'Cache-Control':"no-store,no-cache,must-revalidate,proxy-revalidate"
      }
    }) 
    return response.data
  }
)
const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    setUser: (state,action)=>{

    }
 },
  extraReducers:(builder)=>{
      builder.addCase(registerAction.pending,(state)=>{
        state.isloading=true
      }).addCase(registerAction.fulfilled,(state,action)=>{
        state.isloading=false
        state.user=null;
        state.isAuthenticated=false 
      }).addCase(registerAction.rejected,(state,action)=>{
        state.isloading=false
        state.user=null;
        state.isAuthenticated=false 
      })
      builder.addCase(loginAction.pending,(state)=>{
        state.isloading=true
      }).addCase(loginAction.fulfilled,(state,action)=>{
        console.log(action)
        state.isloading=false
        state.user=(action.payload.success==1)?action.payload.user:null;
        state.isAuthenticated=(action.payload.success==1)?true:false 
      }).addCase(loginAction.rejected,(state,action)=>{
        state.isloading=false
        state.user=null;
        state.isAuthenticated=false 
      })
       builder.addCase(checkAuthAction.pending,(state)=>{
        state.isloading=true
      }).addCase(checkAuthAction.fulfilled,(state,action)=>{
        console.log(action)
        state.isloading=false
        state.user=(action.payload.success==1)?action.payload.user:null;
        state.isAuthenticated=(action.payload.success==1)?true:false 
      }).addCase(checkAuthAction.rejected,(state,action)=>{
        state.isloading=false
        state.user=null;
        state.isAuthenticated=false 
      })
       builder.addCase(logOutAction.pending,(state)=>{
        state.isloading=true
      }).addCase(logOutAction.fulfilled,(state,action)=>{
        console.log(action)
        state.isloading=false
        state.user=null;
        state.isAuthenticated=(action.payload.success==1)?false:true 
      }).addCase(logOutAction.rejected,(state,action)=>{
        state.isloading=false
        state.user=null;
        state.isAuthenticated=true 
      })
    }
})
export const {setUser} = authSlice.actions
export default  authSlice.reducer;