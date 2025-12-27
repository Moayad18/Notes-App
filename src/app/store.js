import { configureStore } from "@reduxjs/toolkit";
import reducerNote from "../reducers/sliceNote";
import reducerLoginAuth from "../reducers/sliceLoginAuth";
const store = configureStore({
  reducer: {
    note: reducerNote,
    loginAuth: reducerLoginAuth,
  },
});

export default store;
