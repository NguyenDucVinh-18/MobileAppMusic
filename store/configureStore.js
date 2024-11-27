import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import playerSlice from "./playerSlice.js";

const reducer = combineReducers({
  search: searchSlice,
  player: playerSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 320, // Increase the threshold to 128ms or a value that suits your case
      },
    }),
});

export default store;
