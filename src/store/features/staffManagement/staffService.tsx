import { STAFFLIST, ADD_STAFF, EDIT_STAFF, DELETE_STAFF, ACTIVE_BLOCK_STAFF, RESEND_STAFF } from "../../../api/endPoint"
import instance from "../../../helpers/axios"
import { addData, changeStatus, editData, sendStaff } from "../../../interface/staffInterface"


/**
 * Retrieves the list of staff members from the server.
 * @returns A Promise that resolves with the staff list data.
 */
const getStaffList = () => {
    return instance.get(STAFFLIST)
}

/**
 * Add a new staff member using the provided data.
 * @param {addData} data - The data of the staff member to be added.
 * @returns A Promise that resolves to the result of the POST request.
 */
const addStaff = (data: addData) => {
    return instance.post(ADD_STAFF, data)
}

/**
 * Edit staff information using the provided data.
 * @param {editData} data - The data containing information to edit staff.
 * @returns A Promise that resolves to the result of the POST request.
 */
const editStaff = (data: editData) => {
    return instance.post(EDIT_STAFF, data)
}

/**
 * Deletes a staff member with the given ID.
 * @param {string} data - The ID of the staff member to be deleted.
 * @returns A promise that resolves to the result of the deletion request.
 */
const deleteStaff = (data: string) => {
    return instance.delete(`${DELETE_STAFF}?id=${data}`)
}

/**
 * Updates the status of a staff member using the provided data.
 * @param {changeStatus} data - The data containing the new status for the staff member.
 * @returns A Promise that resolves to the result of the PUT request.
 */
const changeStaffStatus = (data: changeStatus) => {
    return instance.put(ACTIVE_BLOCK_STAFF, data)
}

/**
 * Resend staff data to the server.
 * @param {sendStaff} data - The data to be sent to the server.
 * @returns A Promise that resolves to the response from the server.
 */
const resendStaff = (data: sendStaff) => {
    return instance.post(RESEND_STAFF, data)
}

/**
 * Service object that contains methods for managing staff members.
 * @type {Object}
 * @property {Function} getStaffList - Retrieves the list of staff members.
 * @property {Function} addStaff - Adds a new staff member.
 * @property {Function} editStaff - Edits an existing staff member.
 * @property {Function} deleteStaff - Deletes a staff member.
 * @property {Function} changeStaffStatus - Changes the status of a staff member.
 * @property {Function} resendStaff - Resends an invitation to a staff member.
 */
const staffService = {
    getStaffList,
    addStaff,
    editStaff,
    deleteStaff,
    changeStaffStatus,
    resendStaff
}

export default staffService;
