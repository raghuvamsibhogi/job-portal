// const { configureStore } = require("@reduxjs/toolkit");
import { configureStore } from "@reduxjs/toolkit";
import jobFilterSlice from "../store/search-slice"
const store =configureStore({
    reducer:{
     jobFilterSlice:jobFilterSlice

    }
})
export default store;       