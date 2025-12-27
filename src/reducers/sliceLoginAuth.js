/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }, thunkapi) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return { uid: res.user.uid, email: res.user.email };
    } catch (error) {
      return thunkapi.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkapi) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { uid: res.user.uid, email: res.user.email };
    } catch (error) {
      return thunkapi.rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (thunkapi) => {
  try {
    const res = await signOut(auth);
    return null;
  } catch (error) {
    return thunkapi.rejectWithValue(error.message);
  }
});

const reducerLoginAuth = createSlice({
  name: "loginAuth",
  initialState: {
    user: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(state.error);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { setUser } = reducerLoginAuth.actions;
export default reducerLoginAuth.reducer;
