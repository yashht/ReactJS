import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import programService from "./programService";


interface programState {
    programListData: any[],
}


/**
 * An asynchronous thunk function that fetches the program list from the server.
 * @returns A promise that resolves to the program list data.
 */
export const programList = createAsyncThunk("program/list", async () => {
    const res = await programService.getProgramList();
    return res?.data;
});



/**
 * Creates a Redux slice for the 'program' state, including initial state, reducers, and extra reducers.
 * @param {object} An object containing the configuration for the slice.
 * @returns None
 */
const programSlice = createSlice({
    name: 'program',
    initialState: {
       programListData: [{}],
    } as programState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(programList.pending, (state:programState ) => {
            })
            .addCase(programList.fulfilled, (state:programState , action) => {
                state.programListData = action.payload;
            })
            .addCase(programList.rejected, (state:programState ) => {
            });

    },
});



export default programSlice.reducer;