import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  note: null, // Changed from an array to a single note
  loading: false,
  error: null,
};

export const createNote = createAsyncThunk(
  "notes/createNote",
  async ({ title, content, category }, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // API call to create the note
      const { data } = await axios.post(
        "api/notes/create",
        { title, content, category },
        config
      );
      return data; // Return the created note data to the fulfilled state
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.note = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default noteSlice.reducer;
