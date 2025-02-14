import { PROGRAM_LIST } from "../../../api/endPoint"
import instance from "../../../helpers/axios"


/**
 * Retrieves the list of program members from the server.
 * @returns A Promise that resolves with the program list data.
 */
const getProgramList = () => {
    return instance.get(PROGRAM_LIST)
}


const programService = {
    getProgramList
}

export default programService;
