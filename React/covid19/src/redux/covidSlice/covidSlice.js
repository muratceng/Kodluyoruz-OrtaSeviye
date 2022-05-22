import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk('covid/getData', async (iso)=>{
    if(iso == ''){
        const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}`)
        return res.data
    }else{
        const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/countries/${iso}`)
        return res.data;
    }
    
})

export const fetchCountry = createAsyncThunk('covid/getCountries', async ()=>{
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/countries`)
    return res.data;
})

 export const covidSlice=createSlice({
     name:"covid",
     initialState:{
        data:[],
        loading:false,
        countries:[],
        error:"",
        countryLoading:false
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
         },
         [fetchCountry.pending]:(state,action)=>{
             state.countryLoading = true;
         },
         [fetchCountry.fulfilled]:(state,action)=>{
             state.countries=action.payload;
             state.countryLoading=false;
         },
         [fetchCountry.rejected]:(state,action)=>{
             state.error=state.error.message;
             state.countryLoading=false;
         }
     }
 })

 export default covidSlice.reducer;