import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orgService from "./organisationService";
import { addOrgParams, editOrgParams, changeStatus, resendInviteOrg, addOrgData, errorResponse, updateOrgData, deleteOrgData, enableOrgData, organisation, resendInviteData, orgQueryParamsPayload } from '../../../interface/organisationInterface';
import { AxiosResponse } from "axios";


interface orgState {
    orgListData: organisation[],
    totalOrgCount: number,
    isLoading: boolean,
    errorRespose: errorResponse,
    orgQueryParams: any
}

/**
 * Creates an asynchronous thunk to fetch the org list from the server.
 * @returns A promise that resolves with the org list data.
 */
export const orgList = createAsyncThunk("org/list", async (queryParams: orgQueryParamsPayload) => {
    const res = await orgService.getOrgList(queryParams)
    return res?.data;
});

/**
 * Creates an asynchronous thunk to export data to a CSV file.
 * @param {string} "org/exportCsv" - The type of the thunk action.
 * @param {Function} async (queryParams: any) - The async function that fetches the data to export.
 * @returns The data exported to a CSV file.
 */
export const exportCsv = createAsyncThunk("org/exportCsv", async (queryParams: orgQueryParamsPayload) => {
    const res = await orgService.exportCsv(queryParams)
    return res;
});

/**
 * Creates an asynchronous thunk to invite org members.
 * @param {addOrgParams} data - The data needed to invite org members.
 * @returns {Promise<AxiosResponse<string, addOrgData>>} A promise that resolves to the response from inviting org members.
 */
export const addOrg = createAsyncThunk("org/inviteOrg", async (data: addOrgParams) => {
    const res: AxiosResponse<string, addOrgData> = await orgService.addOrg(data)
    const newOrg: organisation = JSON.parse(JSON.stringify(res.data))
    return { res, params: newOrg };
});

/**
 * Asynchronous thunk function that dispatches an action to edit org information.
 * @param {editOrgParams} data - The data containing information to edit org.
 * @returns An object containing the response from the server and the parameters used for editing org.
 */
export const editOrg = createAsyncThunk("org/editOrg", async (data: editOrgParams) => {
    const res: AxiosResponse<string, updateOrgData> = await orgService.editOrg(data)
    const updatedOrg: organisation = JSON.parse(JSON.stringify(res.data))
    return { res, params: updatedOrg };
});

/**
 * Asynchronous thunk function that dispatches an action to delete a org member.
 * @param {string} data - The data needed to delete the org member.
 * @returns An object containing the response from the API call and the parameters used.
 */
export const deleteOrgList = createAsyncThunk("org/deleteOrg", async (data: string) => {
    const res: AxiosResponse<string, deleteOrgData> = await orgService.deleteOrg(data)
    return { res, params: data };
});

/**
 * Creates an asynchronous thunk for changing the status of a org member.
 * @param {string} "org/changeOrgStatus" - The type of the async thunk.
 * @param {changeStatus} data - The data containing the status change information.
 * @returns An object containing the response from the API call and the parameters used.
 */
export const changeOrgStatus = createAsyncThunk("org/changeOrgStatus", async (data: changeStatus) => {
    const res: AxiosResponse<string, enableOrgData> = await orgService.changeOrgStatus(data)
    return { res, params: data };
})

/**
 * Creates an asynchronous thunk to resend an invitation to org members.
 * @param {string} "org/resendInvite" - The type of the async thunk.
 * @param {Function} async (data: resendInviteOrg) - The async function that sends the invitation.
 * @returns A promise that resolves to an object containing the response and the parameters used.
 */
export const resendOrgInvite = createAsyncThunk("org/resendInvite", async (data: resendInviteOrg) => {
    const res: AxiosResponse<string, resendInviteData> = await orgService.resendOrgInvite(data)
    const updatedOrg: organisation = JSON.parse(JSON.stringify(res.data))
    return { res, params: updatedOrg };
})



/**
 * Creates a Redux slice for managing org-related state and actions.
 * @param {Object} orgSlice - The configuration object for creating the slice.
 * @returns None
 */
const orgSlice = createSlice({
    name: 'organisation',
    initialState: {
        orgListData: [{}],
        totalOrgCount: 0,
        errorRespose: {},
        isLoading: false,
        orgQueryParams: { page: 1, filters: {} }
    } as orgState,
    //orgListDataRes
    reducers: {
        setOrgQueryParams: (state, action) => {
            console.log("slice", action.payload);
            state.orgQueryParams = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(orgList.pending, (state: orgState) => {
                state.isLoading = true;
            })
            .addCase(orgList.fulfilled, (state: orgState, action) => {
                state.isLoading = false;
                state.totalOrgCount = action.payload.totalCount
                if (state.orgQueryParams.page === 1) state.orgListData = action.payload.list
                else state.orgListData = [...state.orgListData, ...action.payload.list];
            })
            .addCase(orgList.rejected, (state: orgState) => {
                state.isLoading = false;
            });

        // create
        builder
            .addCase(addOrg.pending, (state: orgState) => {
                state.isLoading = true;
            })
            .addCase(addOrg.fulfilled, (state: orgState, action) => {
                state.isLoading = false;
                state.totalOrgCount += 1
                state.orgListData = [action.payload.params, ...state.orgListData]
            })
            .addCase(addOrg.rejected, (state: orgState, action) => {
                state.isLoading = false;
                state.errorRespose = action?.error
            });

        // update
        builder
            .addCase(editOrg.pending, (state: orgState) => {
                state.isLoading = true;
            })
            .addCase(editOrg.fulfilled, (state: orgState, action) => {
                state.isLoading = false;
                state.orgListData = state.orgListData.map((item: any) => {
                    if (item?._id === action?.payload?.params?._id) {
                        return { ...item, ...action.payload.params }
                    }
                    return item;
                })
            })
            .addCase(editOrg.rejected, (state: orgState, action) => {
                state.isLoading = false;
                state.errorRespose = action?.error
            });


        // delete
        builder
            .addCase(deleteOrgList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteOrgList.fulfilled, (state: orgState, action) => {
                state.isLoading = false;
                state.totalOrgCount -= 1
                state.orgListData = state.orgListData.filter((item: any) => item?._id !== action?.payload?.params)
            })
            .addCase(deleteOrgList.rejected, (state: orgState, action) => {
                state.isLoading = false;
                state.errorRespose = action?.error
            });

        // enbale-disbled
        builder
            .addCase(changeOrgStatus.pending, (state: orgState) => {
                state.isLoading = true;
            })
            .addCase(changeOrgStatus.fulfilled, (state: orgState, action) => {
                state.isLoading = false;
                state.orgListData = state.orgListData.map((item: any) => {
                    if (item._id === action.payload?.params?.id) {
                        return { ...item, status: action.payload?.params?.status };
                    }
                    return item;
                });

            })
            .addCase(changeOrgStatus.rejected, (state: orgState, action) => {
                state.isLoading = false;
                state.errorRespose = action?.error
            });

        // invite
        builder
            .addCase(resendOrgInvite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resendOrgInvite.fulfilled, (state: orgState, action) => {
                state.isLoading = false;
                state.orgListData = state.orgListData.map((item: any) => {
                    if (item._id === action.payload?.params?._id) {
                        return { ...item, invitedOn: action.payload?.params?.invitedOn };
                    }
                    return item;
                });
            })
            .addCase(resendOrgInvite.rejected, (state: orgState, action) => {
                state.isLoading = false;
                state.errorRespose = action?.error
            });

    },
});


export const { setOrgQueryParams } = orgSlice.actions
export default orgSlice.reducer;