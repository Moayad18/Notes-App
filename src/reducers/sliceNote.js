import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const addNoteAsync = createAsyncThunk(
  "notes/addNote",
  async (noteData, { rejectedWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "notes"), noteData);
      return {
        id: docRef.id,
        ...noteData,
      };
    } catch (error) {
      rejectedWithValue(error.message);
    }
  }
);
export const editNoteAsync = createAsyncThunk(
  "notes/editNote",
  async (noteData, { rejectedWithValue }) => {
    try {
      const docRef = doc(db, "notes", noteData.id);
      await updateDoc(docRef, {
        title: noteData.title,
        body: noteData.body,
      });
      return noteData;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
export const deleteNoteAsync = createAsyncThunk(
  "notes/deleteNote",
  async (noteData, { rejectedWithValue }) => {
    try {
      const docRef = doc(db, "notes", noteData.id);
      await deleteDoc(docRef);
      return noteData.id;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);
export const pinNoteAsync = createAsyncThunk(
  "notes/pinNote",
  async (noteData, { rejectedWithValue }) => {
    try {
      const docRef = doc(db, "notes", noteData.id);
      await updateDoc(docRef, { isPined: !noteData.isPined });
      return { id: noteData.id, isPined: !noteData.isPined };
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (userId) => {
    const q = query(collection(db, "notes"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const notes = [];
    querySnapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });
    return notes;
  }
);

const reducerNote = createSlice({
  name: "note",
  initialState: {
    notes: [],
    isLoading: false,
  },
  reducers: {
    clearNotes: (state) => {
      state.notes = [];
      state.isLoading = false;
    },
    pin: (state, action) => {
      const updateNotes = state.notes.map((n) => {
        if (n.id == action.payload.id) {
          const notePin = {
            ...action.payload,
            isPined: !action.payload.isPined,
          };
          return notePin;
        } else {
          return n;
        }
      });
      updateNotes.sort((a, b) => {
        if (a.isPined && !b.isPined) return -1;
        if (b.isPined && !a.isPined) return 1;
        return 0;
      });
      localStorage.setItem("notes", JSON.stringify(updateNotes));
      state.notes = updateNotes;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.isLoading = true;
      })
      .addCase(addNoteAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.notes.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addNoteAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editNoteAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editNoteAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.notes.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(editNoteAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteNoteAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = state.notes.filter((n) => n.id !== action.payload);
      })
      .addCase(deleteNoteAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(pinNoteAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pinNoteAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.notes.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) {
          state.notes[index].isPined = action.payload.isPined;
        }
      })
      .addCase(pinNoteAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setNotes, clearNotes } = reducerNote.actions;
export default reducerNote.reducer;
