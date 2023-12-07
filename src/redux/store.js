import {configureStore} from "@reduxjs/toolkit";
import youtubeReducer from './Slices/youtubeSlice'

const store = configureStore({
    reducer:{
        youtubeApp: youtubeReducer,
    }
});

export default store;