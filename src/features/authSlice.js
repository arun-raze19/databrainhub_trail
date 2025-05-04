import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config/api";
import { useMockData, mockLogin, mockGetMe, mockLogout } from "../services/mockDataService";

// Only set axios defaults if we're not using mock data
if (!useMockData) {
  axios.defaults.baseURL = API_URL;
  axios.defaults.withCredentials = true;
}

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const LoginUser = createAsyncThunk("user/loginUser", async(user, thunkAPI) => {
     try{
        if (useMockData) {
            // Use mock data instead of API call
            const data = await mockLogin(user.email, user.password);
            return data;
        } else {
            // Use real API call
            const response = await axios.post(`${API_URL}/login`,{
                email: user.email,
                password: user.password
            });
            return response.data;
        }
     } catch(error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
        return thunkAPI.rejectWithValue("Login failed. Please try again.");
     }
});

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
    try{
       if (useMockData) {
           // Use mock data instead of API call
           const data = await mockGetMe();
           return data;
       } else {
           // Use real API call
           const response = await axios.get(`${API_URL}/me`);
           return response.data;
       }
    } catch(error) {
       if(error.response){
           const message = error.response.data.msg;
           return thunkAPI.rejectWithValue(message);
       }
       return thunkAPI.rejectWithValue("Failed to get user data.");
    }
});

export const LogOut = createAsyncThunk("user/LogOut", async() => {
    if (useMockData) {
        // Use mock data instead of API call
        await mockLogout();
        return;
    } else {
        // Use real API call
        await axios.delete(`${API_URL}/logout`);
    }
});

export const authSlice =  createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(LoginUser.pending,(state) =>{
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess= true;
            state.user = action.payload;
        });

        builder.addCase(LoginUser.rejected,(state,action) =>{
             state.isLoading = false;
             state.isError = true;
             state.message= action.payload;

         })

         //get user logi
         builder.addCase(getMe.pending,(state) =>{
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess= true;
            state.user = action.payload;
        });

        builder.addCase(getMe.rejected,(state,action) =>{
             state.isLoading = false;
             state.isError = true;
             state.message= action.payload;

         })
    }
});

export const  {reset} = authSlice.actions
export default authSlice.reducer;