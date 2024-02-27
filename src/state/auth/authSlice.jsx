// import { createSlice } from "@reduxjs/toolkit";
// import { registerUser } from './authActions';
// import { loginCustomer } from './authActions';
// import { loginStaff } from './authActions';

// const initialState = {
//     loading: false,
//     userInfo: null,
//     userToken: null, // for storing the JWT
//     error: null,
//     success: false, // for monitoring the registration process.
//   }

//   const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {},
//     extraReducers: {
//       // register user
//       [registerUser.pending]: (state) => {
//         state.loading = true
//         state.error = null
//       },
//       [registerUser.fulfilled]: (state, { payload }) => {
//         state.loading = false
//         state.success = true // registration successful
//       },
//       [registerUser.rejected]: (state, { payload }) => {
//         state.loading = false
//         state.error = payload
//       },
//       [loginCustomer.pending]: (state) => {
//         state.loading = true
//         state.error = null
//       },
//       [loginCustomer.fulfilled]: (state, { payload }) => {
//         state.loading = false
//         state.success = true // registration successful
//       },
//       [loginCustomer.rejected]: (state, { payload }) => {
//         state.loading = false
//         state.error = payload
//       },
//       [loginStaff.pending]: (state) => {
//         state.loading = true
//         state.error = null
//       },
//       [loginStaff.fulfilled]: (state, { payload }) => {
//         state.loading = false
//         state.success = true // registration successful
//       },
//       [loginStaff.rejected]: (state, { payload }) => {
//         state.loading = false
//         state.error = payload
//       },
//     },
//   })
  
//   export default authSlice.reducer

import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginCustomer, loginStaff } from './authActions';

const initialState = {
    loading: false,
    userInfo: null,
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
    authenticated: false // for tracking authentication state
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated(state, action) {
            state.authenticated = action.payload;
        }
    },
    extraReducers: {
        // register user
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
            state.authenticated = true; // set authenticated as true on successful registration
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [loginCustomer.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [loginCustomer.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // login successful
            state.authenticated = true; // set authenticated as true on successful login
            state.userToken = payload.token;
        },
        [loginCustomer.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [loginStaff.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [loginStaff.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // login successful
            state.authenticated = true; // set authenticated as true on successful login
            state.userToken = payload.token;
        },
        [loginStaff.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    },
});

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
