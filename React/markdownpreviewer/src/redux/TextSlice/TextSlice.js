import { createSlice } from "@reduxjs/toolkit";

const help = `Heading
=======
Sub-heading
-----------
### Another deeper heading
Paragraphs are separated
by a blank line.
Leave 2 spaces at the end of a line to do a
line break


Text attributes *italic*, **bold**,
\`monospace\`, ~~strikethrough~~ .

Shopping list:
  * apples
  * oranges
  * pears

Numbered list:
  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.
 *[Herman Fassett](https://freecodecamp.com/hermanfassett)*`;

export const TextSlice = createSlice({
    name:"text",
    initialState:{
        content:"this is user input",
        texthelp:help,
        toggle:false,
    },
    reducers:{
        changeText:(state,action)=>{
            state.content=action.payload;
        },
        toggle:(state,action)=>{
          state.toggle=!state.toggle;
        }
    }
})

export default TextSlice.reducer;
export const {changeText, toggle} =TextSlice.actions;