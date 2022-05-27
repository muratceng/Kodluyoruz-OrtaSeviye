import { createSlice } from "@reduxjs/toolkit";
import turkish from "../../words/turkish.json";
import english from "../../words/english.json";

export const wordsSlice = createSlice({
    name:"words",
    initialState:{
        data:turkish.words,
        spaceCount:0,
        currentWord:"",
        trueWords:[],
        wrongWords:[]
    },
    reducers:{
        shuffleWords:(state)=>{
            const tmp = [...state.data]
                .sort(() => Math.random() - 0.5)
                .map((card) => ({ ...card}));
            state.data = tmp;
        },
        changeEnglish:(state)=>{
            state.data=english;
        },
        changeTurkish:(state)=>{
            state.data=turkish;
        },
        setSpaceCount : (state,action)=>{
            state.spaceCount=action.payload;
        },
        setCurrentword:(state,action)=>{
            state.currentWord=action.payload;
        },
        setTrueWords:(state,action)=>{
            let tmp = [...state.trueWords,action.payload];
            state.trueWords=tmp;
        },
        setWorngWords:(state,action)=>{
            let tmp = [...state.wrongWords,action.payload];
            state.wrongWords=tmp;
        }
    },
})

export const {shuffleWords, setSpaceCount, setCurrentword, setTrueWords, setWorngWords} = wordsSlice.actions;
export default wordsSlice.reducer;