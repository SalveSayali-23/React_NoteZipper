import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// fetch all notes
const API_URL = "https://react-notezipper-backend.onrender.com";

export const listNotes = createAsyncThunk(
  // Step 1: Create the thunk for fetching notes

  "notes/listNotes", // Prefix for auto-generated action types
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo }, // Extract userInfo from the state
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`, // Use the token for authorization
        },
      };

      const { data } = await axios.get(`${API_URL}/api/notes`, config); // API call to fetch notes
      return data; // Data is returned and passed to the fulfilled state
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      ); // Handle errors and pass them to the rejected state
    }
  }
);

// Thunk to update a note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, title, content, category }, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/notes/${id}`,
        { title, content, category },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

//Thunk to delete a note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(`${API_URL}/api/notes/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Step 2: Create the slice to handle notes
const notesSlice = createSlice({
  name: "noteList",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add normal reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(listNotes.pending, (state) => {
        state.loading = true; // Handle loading state
        state.error = null;
      })
      .addCase(listNotes.fulfilled, (state, action) => {
        state.loading = false; // Handle successful fetch
        state.notes = action.payload; // Store the fetched notes
      })
      .addCase(listNotes.rejected, (state, action) => {
        state.loading = false; // Handle error
        state.error = action.payload; // Store the error message
      })
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notes.findIndex(
          (note) => note._id === action.payload._id
        );
        if (index !== -1) {
          state.notes[index] = action.payload; // Update the specific note in the state
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter(
          (note) => note._id !== action.meta.arg
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Step 3: Export the reducer to be used in the store
export default notesSlice.reducer;
