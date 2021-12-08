import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import userSlice from "./user";

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE: // 서버에서 생성된 상태를 클라이언트로 전달해 주는 역할
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user: userSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
