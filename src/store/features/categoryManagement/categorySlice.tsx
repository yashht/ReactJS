import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { addCategoryData, addCategoryParams, categoryResponce, deleteCategoryData, enableCategoryData, EnableCategoryParams, updateCategoryData, updateCategoryParams } from "../../../interface/categoryInterface";
import categoryService from "./categoryService";


interface categoryState {
  categoryList: categoryResponce[],
}


/**
 * An asynchronous thunk action creator that fetches the category list from the server.
 * @returns A promise that resolves to the category list data.
 */
export const categoryListResponce = createAsyncThunk("category/list", async () => {
  const res = await categoryService.getCategoryList();
  return res?.data;
});

/**
 * Creates a category response using the provided data.
 * @param {addCategoryParams} data - The parameters for adding a category.
 * @returns {Promise<AxiosResponse<string, addCategoryData>>} - A promise that resolves to the response from the category service.
 */
export const createCategoryResponces = createAsyncThunk("category/create", async (data: addCategoryParams) => {
  const res: AxiosResponse<string, addCategoryData> = await categoryService.addCategory(data);
  const newCategory: any = JSON.parse(JSON.stringify(res.data));
  return { res, params: newCategory };
});

/**
 * Updates a category by making an asynchronous request to the server.
 * @param {updateCategoryParams} data - The parameters for updating the category.
 * @returns {Promise<{ res: AxiosResponse<string, updateCategoryData>, params: updateCategoryParams }>} - A promise that resolves to an object containing the response from the server and the original parameters.
 */
export const updateCategoryResponce = createAsyncThunk("category/update", async (data: updateCategoryParams) => {
  const res: AxiosResponse<string, updateCategoryData> = await categoryService.editCategory(data)
  return { res, params: data }
});

/**
 * Deletes a category using the provided data.
 * @param {string} data - The data needed to delete the category.
 * @returns {Promise<{ res: AxiosResponse<string, deleteCategoryData>, params: string }>} - A promise that resolves to an object containing the response from the delete request and the parameters used.
 */
export const deleteCategoryResponce = createAsyncThunk("category/delete", async (data: string) => {
  const res: AxiosResponse<string, deleteCategoryData> = await categoryService.deleteCategory(data);
  return { res, params: data };
});

/**
 * Enables a disabled product response by dispatching an asynchronous thunk action.
 * @param {EnableCategoryParams} data - The parameters needed to enable the category.
 * @returns A promise that resolves to an object containing the response and the parameters.
 */
export const enableDisbledProductResponce = createAsyncThunk("category/enable", async (data: EnableCategoryParams) => {
  const res: AxiosResponse<string, enableCategoryData> = await categoryService.enableDisbledCategory(data)
  return { res, params: data };
});




/**
 * Creates a Redux slice for managing the 'category' state.
 * @param {Object} config - The configuration object for the slice.
 * @param {string} config.name - The name of the slice.
 * @param {Object} config.initialState - The initial state of the slice.
 * @param {Array} config.initialState.categoryList - The list of categories.
 * @param {Object} config.initialState
 */
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryList: [{}],
  } as categoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoryListResponce.pending, (state: categoryState) => {
      })
      .addCase(categoryListResponce.fulfilled, (state: categoryState, action) => {
        state.categoryList = action.payload;
      })
      .addCase(categoryListResponce.rejected, (state: categoryState) => {
      });

    // create

    builder
      .addCase(createCategoryResponces.pending, (state: categoryState) => {
      })
      .addCase(createCategoryResponces.fulfilled, (state: categoryState, action) => {        
        const causeDetails = action.payload.params.causeDetails
        state.categoryList = [{...action.payload.params.category, causeDetails}, ...state.categoryList]
      })
      .addCase(createCategoryResponces.rejected, (state: categoryState, action) => {
      });

    // update
    builder
      .addCase(updateCategoryResponce.pending, (state) => {
      })
      .addCase(updateCategoryResponce.fulfilled, (state: categoryState, action) => {
        state.categoryList = state.categoryList?.map((item: any) => {
          if (item?._id === action?.payload?.params?.id) {
            return {
              ...item,
              category: action.payload.params.title,
              aboutcategory: action.payload.params.aboutCategory,
              categoryicon: action.payload.params.icon,
              thumbnailfile: action.payload.params.image
            }
          }
          return item;
        })
      })
      .addCase(updateCategoryResponce.rejected, (state: categoryState, action) => {
      });


    // delete
    builder
      .addCase(deleteCategoryResponce.pending, (state: categoryState) => {
      })
      .addCase(deleteCategoryResponce.fulfilled, (state: categoryState, action) => {
        state.categoryList = state.categoryList?.filter((item: any) => item?._id !== action?.payload?.params)
      })
      .addCase(deleteCategoryResponce.rejected, (state: categoryState, action) => {
      });


    // enbale-disbled
    builder
      .addCase(enableDisbledProductResponce.pending, (state: categoryState) => {
      })
      .addCase(enableDisbledProductResponce.fulfilled, (state: categoryState, action) => {
        state.categoryList = state.categoryList.map((item) => {
          if (item._id === action.payload?.params?.id) {
            return { ...item, status: action.payload?.params?.status };
          }
          return item;
        });

      })
      .addCase(enableDisbledProductResponce.rejected, (state: categoryState, action) => {
      });


  },
});


export default categorySlice.reducer;
