import { configureStore } from "@reduxjs/toolkit";
import Userslice from "./Slices/Userslice";
import PodcastSlice from "./Slices/PodcastSlice";


export default configureStore({
    reducer:
    {
        user:Userslice,
        podcasts:PodcastSlice
        
    }
})