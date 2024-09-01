import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice"; // Go up one level from store to src, then into slices
import registerReducer from "../slices/userRegister";
import noteReducer from "../slices/noteSlice";
import notesReducer from "../slices/notesSlice";

// const initialState = {};
const userFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  // initialState,
  reducer: {
    user: userReducer, // Handle user login and logout
    register: registerReducer, // Handle user registration
    note: noteReducer, // Reducer for single note creation
    noteList: notesReducer, // Reducer for listing notes
  },
  preloadedState: {
    user: {
      userInfo: userFromLocalStorage,
      loading: false,
      error: null,
    },
  },
});
console.log("Initial State:", store.getState()); // Check initial state

export default store;
