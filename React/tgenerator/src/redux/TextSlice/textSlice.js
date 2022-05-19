import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchText = createAsyncThunk('text/getText', async (count,format) =>{
    const res = await axios (`${process.env.REACT_APP_BASE_ENDPOINT}&paras=${count}&format=${format}`);
    return res.data;
})

export const textSlice = createSlice({
    name:"text",
    initialState:{
        content:"",
        isloading:false,
    },
    reducers:{
    },
    extraReducers:{
        [fetchText.fulfilled]:(state,action)=>{
            state.content=action.payload;
            state.isloading=false;
        },
        [fetchText.pending]:(state,action)=>{
            state.isloading=true;
        },
        [fetchText.rejected]:(state,action)=>{
            state.isloading=false;
            state.error = state.error.message
        }

    }
});

export default textSlice.reducer;