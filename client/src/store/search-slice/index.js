import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
    jobTitle : '',
    jobLocation : '',
    jobFilters:{},
    showRecuriterLogin:false
}
const jobFilterSlice = createSlice({
    name:"jobFilter",
    initialState,
    reducers:{
        setJobTitle:(state,action)=>{
           state.jobTitle = action.payload
        },
        setLocation:(state,action)=>{
           state.jobLocation = action.payload
        },
        setJobFilter:(state,action)=>{
         state.jobFilters = action.payload
        },
         reSetJobTitle:(state,action)=>{
           state.jobTitle = ''
        },
        reSetLocation:(state,action)=>{
           state.jobLocation = ''
        },
        setShowRecuriterLogin:(state,action)=>{
         state.showRecuriterLogin=action.payload
        }
    }
})
export const {setJobTitle,setLocation,reSetJobTitle,reSetLocation,setJobFilter,setShowRecuriterLogin} = jobFilterSlice.actions
export default jobFilterSlice.reducer