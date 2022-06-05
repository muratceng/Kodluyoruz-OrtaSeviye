import { createSlice } from "@reduxjs/toolkit";


const pieces=[];

for(let i=1;i<3;i++){
    for(let j=0;j<8;j++){
        pieces.push({
            image:'assets/white.png',
            x:i,
            y:j
        })
    }
}

for(let i=5;i<7;i++){
    for(let j=0;j<8;j++){
        pieces.push({
            image:'assets/black.png',
            x:i,
            y:j
        })
    }
}

const GameSlice = createSlice({
    name:'game',
    initialState:{
        turn:'white',
        pieces:pieces,

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