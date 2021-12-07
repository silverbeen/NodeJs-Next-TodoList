import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../slices/user";

axios.defaults.baseURL = "http://localhost:3051";
axios.defaults.withCredentials = true;

export const signup = createAsyncThunk(
  "user/signup",
  async (data: User, { rejectWithValue }) => {
    try {
      const res = await axios.post("/signup", data);
      return res.data;
    } catch (error) {
      console.log(error);
      // return rejectWithValue(error.response.data);
    }
  }
);

export const logIn = createAsyncThunk(
  "user/login",
  async (data: User, { rejectWithValue }) => {
    try {
      const res = await axios.post("/login", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logOut = createAsyncThunk("user/logOut", async () => {
  const res = await axios.post("/logout");
  return res.data;
});

export const loadUser = createAsyncThunk("/user/load", async () => {
  const response = await axios.get("/user");
  console.log(response.data);
  return response.data;
});
