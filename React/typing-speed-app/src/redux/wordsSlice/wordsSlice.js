import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk('words/getData', async (lang)=>{
    const res = await axios(`${lang}.json`)
    return res.data;

})

export const wordsSlice = createSlice({
    name:"words",
    initialState:{
        data:[],
        loading:false,
        error:''
    },
    reducers:{

    },
    extraReducers:{
        [fetchData.pending]:(state,action)=>{
            state.loading=true;
        },
        [fetchData.fulfilled]:(state,action)=>{
            state.loading=false;
        },
        [fetchData.rejected]:(state,action)=>{
            state.loading=false;
            state.error=state.error.message;
        }
    }
})

export default wordsSlice.reducer;