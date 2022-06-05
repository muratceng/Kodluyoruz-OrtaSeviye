import { createSlice } from "@reduxjs/toolkit";

const GameSlice = createSlice({
    name:'game',
    initialState:{
        turn:'white',

    },
    reducers:{
        nextTurn:(state)=>{
            if(state.turn==='white'){
                state.turn='black'
            }else{
                state.turn='white'
            }
        }
    }
})

export const {nextTurn} = GameSlice.actions;

export default GameSlice.reducer;