import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { dataReducer } from "./slices/dataSlice/dataSlice";
import { uiDataReducer } from "./slices/uiSlice/uiSlice";
import { userReducer } from "./slices/userSlice/userSlice";

const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiDataReducer,
  user: userReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
