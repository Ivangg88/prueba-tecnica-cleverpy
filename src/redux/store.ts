import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { dataReducer } from "./slices/dataSlice/dataSlice";
import { uiDataReducer } from "./slices/uiSlice/uiSlice";

const rootReducer = combineReducers({
  data: dataReducer,
  ui: uiDataReducer,
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