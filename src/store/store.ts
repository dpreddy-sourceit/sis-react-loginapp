import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./app/appSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
