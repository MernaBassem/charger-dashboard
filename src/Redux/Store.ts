
// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
// import chargersreducer from "./Slices/Chargers"
import locationReducer from './Slices/locationSlice';

const store=configureStore({
    reducer: {
    // chargers:chargersreducer,
    location: locationReducer,
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store


