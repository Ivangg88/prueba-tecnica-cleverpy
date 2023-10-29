import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialLoggedUser } from "../../../utils/initialStates";
import { UserLoged } from "../../../types/interfaces";

const userSlice = createSlice({
  name: "user",
  initialState: initialLoggedUser,
  reducers: {
    loginUser: (previousState, action: PayloadAction<UserLoged>) => ({
      ...action.payload,
    }),
    logoutUser: (previousState) => initialLoggedUser,
  },
});

export const userReducer = userSlice.reducer;

export const {
  loginUser: loginUserActionCreator,
  logoutUser: logoutUserActionCreator,
} = userSlice.actions;
