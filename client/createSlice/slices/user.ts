import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadUser, logIn, logOut, signup } from "../action/user";

export interface User {
  nickname?: string;
  email: string;
  password: string;
}

const initialState = {
  user: <User>{
    nickname: "",
    email: "",
    password: "",
  },
  isLoggedIn: false,
  logInError: "",
  signupError: "",
  signupDone: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user", // name은 Slice와 맞고, 기억되기 쉬운걸로 지어주자.
  initialState, // 위 초기 상태값 가져오기
  reducers: {},
  extraReducers: (builder) => {
    // builder .addCase는 타입 추론에 용이하다.
    builder
      // 회원가입
      .addCase(signup.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log(action.payload);
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.signupError = action.payload;
      })
      // 로그인
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user.email = action.payload.email;
        state.user.nickname = action.payload.nick;
      })
      .addCase(logIn.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.logInError = action.payload;
      })
      // 로그아웃
      .addCase(logOut.pending, (state, action) => {})
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, (state, action) => {})
      // 로그인 상태 불러오기
      .addCase(loadUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user.email = action.payload.email;
        state.user.nickname = action.payload.nick;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default userSlice;
