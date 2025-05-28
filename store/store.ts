import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import movieReducer from "./movieSlice";
import userReducer from "./userSlice";



 const store = configureStore({
reducer:{

    auth:authReducer,
    user:userReducer,
    movie:movieReducer

}

})


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =typeof store.dispatch

