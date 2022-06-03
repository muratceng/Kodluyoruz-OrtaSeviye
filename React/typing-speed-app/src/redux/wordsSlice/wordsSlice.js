import { createSlice } from "@reduxjs/toolkit";
import turkish from "../../words/turkish.json";


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
        setWrongWords:(state,action)=>{
            let tmp = [...state.wrongWords,action.payload];
            state.wrongWords=tmp;
        },
        restart:(state)=>{
            state.data = turkish.words;
            state.currentWord="";
            state.spaceCount=0;
            state.trueWords=[];
            state.wrongWords=[];
        }
    },
})

export const {shuffleWords, setSpaceCount, setCurrentword, setTrueWords, setWrongWords, restart} = wordsSlice.actions;
export default wordsSlice.reducer;