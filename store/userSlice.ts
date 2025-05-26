import { getUserData } from "@/services/databaseStorage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
    userDetails:userProps |null,
    userDetailsLoading:boolean,
    userDetailsError:string|null
}


export const getUserDetails = createAsyncThunk(
"user/data",
async():Promise<userProps | null> =>{
    
    try {
    const getUSerDataFromDB = await getUserData()
    return getUSerDataFromDB
} catch (error) {
    
    console.log(`Error have been thrown in getUSerData in UserSlice, Error:-${error}`);
    
    throw error
}


}
    

)

const initialState :UserState={

userDetails:null,
userDetailsLoading:false,
userDetailsError:null

}

const userSlice = createSlice({
name:"user",
initialState,
reducers:{

clearUserData(state){

    // eslint-disable-next-line no-unused-expressions
    state.userDetails=null,
    state.userDetailsLoading=false,
    state.userDetailsError=null
}

},
extraReducers(builder) {
    builder.addCase(getUserDetails.pending,(state)=>{

state.userDetailsLoading=true


    }).addCase(getUserDetails.fulfilled,(state,action)=>{

state.userDetails=action.payload
state.userDetailsLoading=false

    }).addCase(getUserDetails.rejected,(state,action)=>{

state.userDetailsLoading=false,
state.userDetailsError=action.error.message || "can't get the user data"


    })
},


})

export default userSlice.reducer
