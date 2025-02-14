import { CAUSELIST, EDIT_CAUSE } from "../../../api/endPoint"
import instance from "../../../helpers/axios"
import { updateCauseParams } from "../../../interface/causeInterface"


 /**
  * Retrieves the cause list from the server.
  * @returns {Promise} A promise that resolves to the cause list data.
  */
 const getCauseList = () => {
    return instance.get(CAUSELIST)
 }

 /**
  * Updates a cause with the provided data.
  * @param {updateCauseParams} data - The data to update the cause with.
  * @returns A Promise that resolves to the updated cause.
  */
 const updateCause = (data:updateCauseParams) => {    
    return instance.post(`${EDIT_CAUSE}`, {
        quoteBy: data?.quoteBy,
        quote: data?.quote,
        image: data?.image,
        id: data?.id
    })
}

/**
 * An object that contains methods related to managing causes.
 * @property {Function} getCauseList - Retrieves a list of causes.
 * @property {Function} updateCause - Updates a cause.
 */
const causeService = {
    getCauseList,
    updateCause
}

export default causeService;
