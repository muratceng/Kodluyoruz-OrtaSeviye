import { configureStore } from "@reduxjs/toolkit";
import textSlice from "./TextSlice/textSlice";

export const store = configureStore({
    reducer:{
        text:textSlice,
    }
})