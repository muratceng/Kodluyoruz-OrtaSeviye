import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk('covid/getData', async ()=>{
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}`)
    console.log(`${process.env.REACT_APP_API_BASE_ENDPOINT}`)
    return res.data;
})

 export const covidSlice=createSlice({
     name:"covid",
     initialState:{
        data:[],
        loading:false,
        error:""
     },
     reducers:{},
     extraReducers:{
         [fetchData.pending]:(state,action)=>{
            state.loading=true;
         },
         [fetchData.fulfilled]:(state,action)=>{
             state.loading=false;
            state.data=action.payload;
         },
         [fetchData.rejected]:(state,action)=>{
             state.loading=false;
             state.error=state.error.message;
         }
     }
 })

 export default covidSlice.reducer;