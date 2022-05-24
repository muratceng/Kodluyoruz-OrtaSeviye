import { configureStore } from "@reduxjs/toolkit";
import wordsSlice from "./wordsSlice/wordsSlice";

export const store = configureStore({
    reducer:{
        words:wordsSlice
    }
})

export default store;