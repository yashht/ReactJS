import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { forgotErrorMessage, forgotParams, forgotResData, resetData, resetErrorMessage, resetParams, setPassErrorMessage, setPasswordData, setPasswordParams, signInData, signInErrorMessage, signInParams } from "../../../interface/authInterface";
import authServices from "./authService";


/**
 * Asynchronous thunk function that sends a sign-in request to the server.
 * @param {signInParams} data - The sign-in parameters.
 * @returns {Promise<AxiosResponse<string, signInData>>} - A promise that resolves to the server response.
 */
export const signIn = createAsyncThunk("/signIn", async (data: signInParams) => {
  const res: AxiosResponse<string, signInData> = await authServices.signIn(data);
  return res;
});

/**
 * Sends a request to the server to initiate the forgot password process.
 * @param {forgotParams} data - The data required for the forgot password process.
 * @returns {Promise<AxiosResponse<string, forgotResData>>} - A promise that resolves to the server response.
 */
export const forgotPassword = createAsyncThunk("/forgot", async (data: forgotParams) => {
  const res: AxiosResponse<string, forgotResData> = await authServices.forgotPassword(data)
  return res;
});

/**
 * Resets the user's password by sending a request to the "/reset" endpoint.
 * @param {resetParams} data - The data required to reset the password.
 * @returns {Promise<AxiosResponse<string, resetData>>} - A promise that resolves to the response from the server.
 */
export const resetPassword = createAsyncThunk("/reset", async (data: resetParams) => {
  const res: AxiosResponse<string, resetData> = await authServices.resetPassword(data);
  return res;
})



/**
 * Asynchronous thunk function that sends a request to set a password using the provided data.
 * @param {setPasswordParams} data - The data needed to set the password.
 * @returns {Promise<AxiosResponse<string, any>>} A promise that resolves with the response from setting the password.
 */
export const setPassword = createAsyncThunk("/setPassword", async (data: setPasswordParams) => {
  const res: AxiosResponse<string, setPasswordData> = await authServices.setPassword(data);
  return res;
});



// Define the initial state type
interface authState {
  signInResponse: AxiosResponse<string, signInData>;
  signInErrorMessage: signInErrorMessage;
  forgotResponse: AxiosResponse<string, forgotResData>;
  forgotErrorMessage: forgotErrorMessage;
  resetResponse: AxiosResponse<string, resetData>;
  resetErrorMessage: resetErrorMessage;
  setPassResponce: AxiosResponse<string, setPasswordData>;
  setPassError: setPassErrorMessage
}


/**
 * Creates a Redux slice for the 'auth' state, including initial state, reducers, and extra reducers.
 * @param {object} config - The configuration object for the auth slice.
 * @param {string} config.name - The name of the slice.
 * @param {object} config.initialState - The initial state of the slice.
 * @param {object} config.reducers - The reducers for the slice.
 * @param {function} config.extraReducers - The extra reducers for the slice.
 * @returns None
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signInResponse: {},
    signInErrorMessage: {},
    forgotResponse: {},
    forgotErrorMessage: {},

  } as authState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => { })
      .addCase(signIn.fulfilled, (state: authState, action) => {
        state.signInResponse = action.payload;
      })
      .addCase(signIn.rejected, (state: authState, action) => {
        state.signInErrorMessage = action.error;
      });

    // forgot
    builder
      .addCase(forgotPassword.pending, (state) => { })
      .addCase(forgotPassword.fulfilled, (state: authState, action) => {
        state.forgotResponse = action.payload;
      })
      .addCase(forgotPassword.rejected, (state: authState, action) => {
        state.forgotErrorMessage = action.error;
      });

    // reset Password

    builder
      .addCase(resetPassword.pending, (state) => { })
      .addCase(resetPassword.fulfilled, (state: authState, action) => {
        state.resetResponse = action.payload;
      })
      .addCase(resetPassword.rejected, (state: authState, action) => {
        state.resetErrorMessage = action.error;
      });

    // set Password

    builder
      .addCase(setPassword.pending, (state) => { })
      .addCase(setPassword.fulfilled, (state: authState, action) => {
        state.setPassResponce = action.payload;
      })
      .addCase(setPassword.rejected, (state: authState, action) => {
        state.setPassError = action.error;
      });

  },
});



export default authSlice.reducer;