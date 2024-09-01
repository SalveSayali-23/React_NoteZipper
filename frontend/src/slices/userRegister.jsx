import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for handling user registration
export const register = createAsyncThunk(
  "user/register",
  async ({ name, email, password, pic }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Making the API call for registration
      const { data } = await axios.post(
        "/api/users",
        { name, email, password, pic },
        config
      );

      // Save user info to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Return the data on successful registration
      return data;
    } catch (error) {
      // Handle any errors and return the error message
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Create the slice
const registerSlice = createSlice({
  name: "register",
  initialState: { userInfo: null, loading: false, error: null },
  reducers: {
    resetRegisterState: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
