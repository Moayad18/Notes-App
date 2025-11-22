import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
const reducerNote = createSlice({
  name: "note",
  initialState: {
    notes: JSON.parse(localStorage.getItem("notes")) ?? [],
  },
  reducers: {
    add: (state, action) => {
      const newNote = {
        id: uuidv4(),
        isPined: false,
        title: action.payload.title,
        body: action.payload.body,
        fullDate: {
          date: moment().format("L"),
          time: moment().format("LT"),
        },
      };
      const updateNotes = [...state.notes, newNote];
      localStorage.setItem("notes", JSON.stringify(updateNotes));
      state.notes = updateNotes;
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
    edit: (state, action) => {
      const updateNotes = state.notes.map((n) => {
        if (n.id == action.payload.id) {
          const noteEdit = {
            ...n,
            title: action.payload.title,
            body: action.payload.body,
            fullDate: {
              date: action.payload.fullDate.date,
              time: action.payload.fullDate.time,
            },
          };
          return noteEdit;
        } else {
          return n;
        }
      });
      localStorage.setItem("notes", JSON.stringify(updateNotes));
      state.notes = updateNotes;
    },
    del: (state, action) => {
      const updateNotes = state.notes.filter((n) => {
        if (n.id !== action.payload.id) {
          return n;
        }
      });
      localStorage.setItem("notes", JSON.stringify(updateNotes));
      state.notes = updateNotes;
    },
  },
});

export const { add, pin, del, edit } = reducerNote.actions;
export default reducerNote.reducer;
