import { combineReducers } from "redux";
import userSlice from "./user";

const rootReduder = combineReducers({
  users: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReduder>;

export default rootReduder;
