import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { causeDataRes, updateCauseParams, updateCauseRes } from "../../../interface/causeInterface";
import causeService from "./causeService";


interface AuthState {
  causeList: causeDataRes[],
}

/**
 * Async thunk action creator that fetches the cause list from the server.
 * @returns A promise that resolves to the cause list data.
 */
export const causeListResponce = createAsyncThunk("cause/list", async () => {
  const res = await causeService.getCauseList()
  return res?.data;
});

/**
 * Updates a cause by making an asynchronous request to the server.
 * @param {updateCauseParams} data - The parameters for updating the cause.
 * @returns A promise that resolves to an object containing the response from the server and the updated cause parameters.
 */
export const updateCauseResponce = createAsyncThunk("cause/update", async (data: updateCauseParams) => {
  const res: AxiosResponse<string, updateCauseRes> = await causeService.updateCause(data);
  return { res, params: data }
});



/**
 * Creates a Redux slice for the 'cause' state.
 * @param {object} config - The configuration object for the slice.
 * @param {string} config.name - The name of the slice.
 * @param {object} config.initialState - The initial state of the slice.
 * @param {array} config.initialState.causeList - The initial cause list.
 * @param {object} config.reducers - The reducers for the slice.
 * @
 */
const causeSlice = createSlice({
  name: 'cause',
  initialState: {
    causeList: [{}],
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(causeListResponce.pending, (state: AuthState) => {
      })
      .addCase(causeListResponce.fulfilled, (state: AuthState, action) => {
        state.causeList = action.payload;
      })
      .addCase(causeListResponce.rejected, (state: AuthState) => {
      });


    // update
    builder
      .addCase(updateCauseResponce.pending, (state) => {
      })
      .addCase(updateCauseResponce.fulfilled, (state: AuthState, action) => {
        state.causeList = state.causeList?.map((item: any) => {

          if (item?._id === action?.payload?.params?.id) {
            return {
              ...item,
              quoteBy: action.payload.params.quoteBy,
              quote: action.payload.params.quote,
              image: action.payload.params.image
            }
          }
          return item;
        })
      })
      .addCase(updateCauseResponce.rejected, (state: AuthState, action) => {
      });

  },
});



export default causeSlice.reducer;