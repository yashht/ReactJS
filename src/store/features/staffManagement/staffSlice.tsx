import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import staffService from "./staffService";
import { addData, editData, changeStatus, sendStaff, addStaffData, updateStaffData, deleteStaffData, enableStaffData, staffResponce } from '../../../interface/staffInterface';
import { AxiosResponse } from "axios";


interface staffState {
    staffListData: staffResponce[],
}

/**
 * Creates an asynchronous thunk to fetch the staff list from the server.
 * @returns A promise that resolves with the staff list data.
 */
export const staffList = createAsyncThunk("staff/list", async () => {
    const res = await staffService.getStaffList()
    return res?.data;
});

/**
 * Creates an asynchronous thunk to invite staff members.
 * @param {addData} data - The data needed to invite staff members.
 * @returns {Promise<AxiosResponse<string, addStaffData>>} A promise that resolves to the response from inviting staff members.
 */
export const addStaffList = createAsyncThunk("staff/inviteStaff", async (data: addData) => {
    const res: AxiosResponse<string, addStaffData> = await staffService.addStaff(data)
    const newStaff: staffResponce = JSON.parse(JSON.stringify(res.data));
    return { res, params: newStaff };
});

/**
 * Asynchronous thunk function that dispatches an action to edit staff information.
 * @param {editData} data - The data containing information to edit staff.
 * @returns An object containing the response from the server and the parameters used for editing staff.
 */
export const editStaffList = createAsyncThunk("staff/editStaff", async (data: editData) => {
    const res: AxiosResponse<string, updateStaffData> = await staffService.editStaff(data)
    return { res, params: data };
});

/**
 * Asynchronous thunk function that dispatches an action to delete a staff member.
 * @param {string} data - The data needed to delete the staff member.
 * @returns An object containing the response from the API call and the parameters used.
 */
export const deleteStaffList = createAsyncThunk("staff/deleteStaff", async (data: string) => {
    const res: AxiosResponse<string, deleteStaffData> = await staffService.deleteStaff(data)
    return { res, params: data };
});

/**
 * Creates an asynchronous thunk for changing the status of a staff member.
 * @param {string} "staff/changeStaffStatus" - The type of the async thunk.
 * @param {changeStatus} data - The data containing the status change information.
 * @returns An object containing the response from the API call and the parameters used.
 */
export const activeBlockStaff = createAsyncThunk("staff/changeStaffStatus", async (data: changeStatus) => {
    const res: AxiosResponse<string, enableStaffData> = await staffService.changeStaffStatus(data)
    return { res, params: data };
})

/**
 * Creates an asynchronous thunk to resend an invitation to staff members.
 * @param {string} "staff/resendInvite" - The type of the async thunk.
 * @param {Function} async (data: sendStaff) - The async function that sends the invitation.
 * @returns A promise that resolves to an object containing the response and the parameters used.
 */
export const resendStaff = createAsyncThunk("staff/resendInvite", async (data: sendStaff) => {
    const res = await staffService.resendStaff(data)
    return { res, params: data };
})



/**
 * Creates a Redux slice for managing staff-related state and actions.
 * @param {Object} staffSlice - The configuration object for creating the slice.
 * @returns None
 */
const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        staffListData: [{}],
    } as staffState,
    //staffListDataRes
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(staffList.pending, (state: staffState) => {
            })
            .addCase(staffList.fulfilled, (state: staffState, action) => {
                state.staffListData = action.payload;
            })
            .addCase(staffList.rejected, (state: staffState) => {
            });

        // create

        builder
            .addCase(addStaffList.pending, (state: staffState) => {
            })
            .addCase(addStaffList.fulfilled, (state: staffState, action) => {
                state.staffListData = [action.payload.params, ...state.staffListData]
            })
            .addCase(addStaffList.rejected, (state: staffState, action) => {
            });

        // update
        builder
            .addCase(editStaffList.pending, (state: staffState) => {
            })
            .addCase(editStaffList.fulfilled, (state: staffState, action) => {
                state.staffListData = state.staffListData?.map((item: any) => {
                    if (item?._id === action?.payload?.params?.id) {
                        return {
                            ...item,
                            personalDetails: {
                                name: action.payload.params.name,
                                email: action.payload.params.email,
                            }
                        }
                    }
                    return item;
                })
            })
            .addCase(editStaffList.rejected, (state: staffState, action) => {
            });


        // delete
        builder
            .addCase(deleteStaffList.pending, (state) => {
            })
            .addCase(deleteStaffList.fulfilled, (state: staffState, action) => {
                state.staffListData = state.staffListData?.filter((item: any) => item?._id !== action?.payload?.params)
            })
            .addCase(deleteStaffList.rejected, (state: staffState, action) => {
            });


        // enbale-disbled
        builder
            .addCase(activeBlockStaff.pending, (state: staffState) => {
            })
            .addCase(activeBlockStaff.fulfilled, (state: staffState, action) => {
                state.staffListData = state.staffListData.map((item: any) => {
                    if (item._id === action.payload?.params?.id) {
                        return { ...item, status: action.payload?.params?.status };
                    }
                    return item;
                });

            })
            .addCase(activeBlockStaff.rejected, (state: staffState, action) => {
            });

        // invite
        builder
            .addCase(resendStaff.pending, (state) => {
            })
            .addCase(resendStaff.fulfilled, (state: staffState, action) => {

                //    state.staffListData = state.staffListData?.filter((item: any) => item?._id !== action?.payload?.params)
            })
            .addCase(resendStaff.rejected, (state: staffState, action) => {
            });

    },
});



export default staffSlice.reducer;