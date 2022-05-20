import { configureStore } from "@reduxjs/toolkit";
import TextSlice from "./TextSlice/TextSlice";

export const store = configureStore({
    reducer:{
        text:TextSlice,
    },
})