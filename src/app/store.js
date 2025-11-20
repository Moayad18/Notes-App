import { configureStore } from "@reduxjs/toolkit";
import reducerNote from "../reducers/sliceNote";

const store = configureStore({
  reducer: {
    note: reducerNote,
  },
});

export default store;
