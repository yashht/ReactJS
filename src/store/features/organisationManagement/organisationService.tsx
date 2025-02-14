import { ORG_LIST, ADD_ORG, EDIT_ORG, DELETE_ORG, ENABLE_DISBLED__ORG, RESEND_ORG, ORG_EXPORT_LIST } from "../../../api/endPoint"
import instance from "../../../helpers/axios"
import { addOrgParams, changeStatus, editOrgParams, resendInviteOrg } from "../../../interface/organisationInterface"


/**
 * Retrieves the list of organisation members from the server.
 * @returns A Promise that resolves with the organisation list data.
 */
const getOrgList = (queryParams: any) => {
    return instance.get(ORG_LIST, { params: queryParams })
}

/**
 * Export data to a CSV file based on the provided query parameters.
 * @param {any} queryParams - The query parameters to be sent with the request.
 * @returns A Promise that resolves with the exported CSV data.
 */
const exportCsv = (queryParams: any) => {
    return instance.get(ORG_EXPORT_LIST, { params: queryParams })
}

/**
 * Add a new organisation member using the provided data.
 * @param {addOrgParams} data - The data of the organisation member to be added.
 * @returns A Promise that resolves to the result of the POST request.
 */
const addOrg = (data: addOrgParams) => {
    return instance.post(ADD_ORG, data)
}

/**
 * Edit organisation information using the provided data.
 * @param {editOrgParams} data - The data containing information to edit organisation.
 * @returns A Promise that resolves to the result of the POST request.
 */
const editOrg = (data: editOrgParams) => {
    return instance.put(EDIT_ORG, data)
}

/**
 * Deletes a organisation member with the given ID.
 * @param {string} data - The ID of the organisation member to be deleted.
 * @returns A promise that resolves to the result of the deletion request.
 */
const deleteOrg = (data: string) => {
    return instance.delete(`${DELETE_ORG}?id=${data}`)
}

/**
 * Updates the status of a organisation member using the provided data.
 * @param {changeStatus} data - The data containing the new status for the organisation member.
 * @returns A Promise that resolves to the result of the PUT request.
 */
const changeOrgStatus = (data: changeStatus) => {
    return instance.put(ENABLE_DISBLED__ORG, data)
}

/**
 * Resend organisation data to the server.
 * @param {sendOrg} data - The data to be sent to the server.
 * @returns A Promise that resolves to the response from the server.
 */
const resendOrgInvite = (data: resendInviteOrg) => {
    return instance.post(RESEND_ORG, data)
}

/**
 * Service object that contains methods for managing organisation members.
 * @type {Object}
 * @property {Function} getOrgList - Retrieves the list of organisation members.
 * @property {Function} addOrg - Adds a new organisation member.
 * @property {Function} editOrg - Edits an existing organisation member.
 * @property {Function} deleteOrg - Deletes a organisation member.
 * @property {Function} changeOrgStatus - Changes the status of a organisation member.
 * @property {Function} resendOrgInvite - Resends an invitation to a organisation member.
 */
const organisationService = {
    getOrgList,
    exportCsv,
    addOrg,
    editOrg,
    deleteOrg,
    changeOrgStatus,
    resendOrgInvite
}

export default organisationService;
