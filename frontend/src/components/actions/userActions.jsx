// // src/actions/userActions.js
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const login = createAsyncThunk(
//   'user/login', // Action type
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/users/login",
//         { email, password },
//         config
//       );

//       // Save user info to local storage
//       localStorage.setItem("userInfo", JSON.stringify(data));

//       return data; // This is passed to the fulfilled action's payload
//     } catch (error) {
//       return rejectWithValue(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       );
//     }
//   }
// );
