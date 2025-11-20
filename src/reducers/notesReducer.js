import React from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const notesReducer = (currentState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "add": {
      const newNote = {
        id: uuidv4(),
        isPined: false,
        title: payload.title,
        body: payload.body,
        fullDate: {
          date: moment().format("L"),
          time: moment().format("LT"),
        },
      };
      const updateNotes = [...currentState, newNote];
      localStorage.setItem("notes", JSON.stringify(updateNotes));
      return updateNotes;
    }
    case "pin": {
      const updateNotes = currentState.map((n) => {
        if (n.id == payload.id) {
          const notePin = { ...payload, isPined: !payload.isPined };
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
      return updateNotes;
    }
    case "edit": {
      const updateNotes = currentState.map((n) => {
        if (n.id == payload.id) {
          const noteEdit = {
            ...n,
            title: payload.title,
            body: payload.body,
            fullDate: {
              date: payload.fullDate.date,
              time: payload.fullDate.time,
            },
          };
          return noteEdit;
        } else {
          return n;
        }
      });
      localStorage.setItem("notes", JSON.stringify(updateNotes));
      return updateNotes;
    }
    case "delete": {
      const updateNotes = currentState.filter((n) => {
        if (n.id !== payload.id) {
          return n;
        }
      });
      localStorage.setItem("notes", JSON.stringify(updateNotes));
      return updateNotes;
    }
  }
};
