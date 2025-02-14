
import { ADD_CATEGORY, CATEGORY_LIST, DELETE_CATEGORY, EDIT_CATEGORY, ENABLE_DISBLED_CATEGORY } from "../../../api/endPoint";
import instance from "../../../helpers/axios"
import { addCategoryParams, EnableCategoryParams, updateCategoryParams } from "../../../interface/categoryInterface";


 /**
  * Retrieves the category list from the server.
  * @returns {Promise} A promise that resolves with the category list data.
  */
 const getCategoryList = () => {
    return instance.get(CATEGORY_LIST)
 }

 /**
  * Adds a new category to the server.
  * @param {addCategoryParams} data - The parameters for adding a new category.
  * @returns A Promise that resolves to the response from the server.
  */
 const addCategory = (data: addCategoryParams) => {
       return instance.post(ADD_CATEGORY, {
        title: data?.title,
        causeID: data?.causeID,
        image: data?.image,
        icon: data?.icon,
        aboutCategory: data?.aboutCategory,
        imageSize: data?.imageSize
       })
 }

 /**
  * Edits a category by sending a POST request to the server with the updated category data.
  * @param {updateCategoryParams} data - The updated category data.
  * @returns A Promise that resolves to the response from the server.
  */
 const editCategory = (data:updateCategoryParams ) => {
    return instance.post(EDIT_CATEGORY, {
       id: data?.id,
      title: data?.title,
     causeID: data?.causeID,
     image: data?.image,
     icon: data?.icon,
     aboutCategory: data?.aboutCategory,
     imageSize: data?.imageSize
    })
}

/**
 * Enables or disables a category based on the provided data.
 * @param {EnableCategoryParams} data - The data object containing the status and ID of the category.
 * @returns A Promise that resolves to the result of the API call.
 */
const enableDisbledCategory = (data: EnableCategoryParams) => {
    return instance.patch(ENABLE_DISBLED_CATEGORY, {
        status: data?.status,
        id: data?.id
    })
}


/**
 * Deletes a category from the server using the provided data.
 * @param {string} data - The ID of the category to delete.
 * @returns A promise that resolves to the result of the delete request.
 */
const deleteCategory = (data: string) => {
    return instance.delete(`${DELETE_CATEGORY}?id=${data}`)
}

/**
 * A service object that provides methods for managing categories.
 * @property {Function} getCategoryList - Retrieves a list of categories.
 * @property {Function} addCategory - Adds a new category.
 * @property {Function} editCategory - Edits an existing category.
 * @property {Function} deleteCategory - Deletes a category.
 * @property {Function} enableDisbledCategory - Enables or disables a category.
 */
const categoryService = {
    getCategoryList,
    addCategory,
    editCategory,
    deleteCategory,
    enableDisbledCategory
}

export default categoryService;

