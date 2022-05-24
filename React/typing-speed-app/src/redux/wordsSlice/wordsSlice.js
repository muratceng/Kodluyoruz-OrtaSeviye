import { createSlice } from "@reduxjs/toolkit";
import turkish from "../../words/turkish.json";
import english from "../../words/english.json";

export const wordsSlice = createSlice({
    name:"words",
    initialState:{
        data:turkish.words,
    },
    reducers:{
        shuffleWords:(state)=>{
            const tmp = [...state.data]
                .sort(() => Math.random() - 0.5)
                .map((card) => ({ ...card}));
            state.data = tmp;
            console.log("asdas",state.data);
        },
        changeEnglish:(state)=>{
            state.data=english;
        },
        changeTurkish:(state)=>{
            state.data=turkish;
        },
    },
})

export const {shuffleWords} = wordsSlice.actions;
export default wordsSlice.reducer;