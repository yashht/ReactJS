import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastState {
  show: boolean;
  message: string;
  type: string;
}

/**
 * Initial state for the Toast component.
 */
const initialState: ToastState = {
  show: false,
  message: "",
  type: "success",
};

/**
 * Creates a slice for managing toast notifications in the Redux store.
 * @param {string} name - The name of the slice.
 * @param {object} initialState - The initial state of the slice.
 * @param {object} reducers - An object containing the reducer functions for the slice.
 * @returns A slice object that can be used with Redux's configureStore function.
 */
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: string;
      }>
    ) => {
      state.show = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideToast: (state) => {
      state.show = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
