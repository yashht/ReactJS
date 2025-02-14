import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthSliceState } from "../interface/authInterface";
import { causeResponce } from "../interface/causeInterface";
import authSlice from "./features/auth/authSlice";
import causeSlice from "./features/causeManagement/causeSlice";
import toastReducer, { ToastState } from "./features/toast/toastSlice";
import staffSlice from "./features/staffManagement/staffSlice";
import categorySlice from "./features/categoryManagement/categorySlice";
import { categoryResponce } from "../interface/categoryInterface";
import { staffResponce } from "../interface/staffInterface";
import organisationSlice from "./features/organisationManagement/organisationSlice";
import { organisation } from "../interface/organisationInterface";
import programSlice from "./features/programManagement/programSlice";

export interface RootState {
  toast: ToastState;
  auth: AuthSliceState; // Include the state from the auth slice
  cause: causeResponce;
  category: categoryResponce
  staff: staffResponce
  organisation: organisation
}

/**
 * Configuration object for persisting data using Redux Persist.
 * @type {Object}
 * @property {string} key - The key under which the data will be stored.
 * @property {Object} storage - The storage engine to be used for persisting the data.
 */
// const persistConfig = {
//   key: "root",
//   storage,
// };

/**
 * Combines multiple reducers into a single reducer object.
 * @param {Object} reducers - An object containing the reducers to be combined.
 * @returns A single reducer that encompasses all the individual reducers.
 */
const rootReducer = combineReducers({
  toast: toastReducer,
  auth: authSlice,
  cause: causeSlice,
  staff: staffSlice,
  category: categorySlice,
  organisation: organisationSlice,
  program: programSlice
});

/**
 * Returns a new persisted reducer by combining the provided persist configuration
 * with the root reducer.
 * @param {PersistConfig} persistConfig - The configuration for persisting the state.
 * @param {Reducer} rootReducer - The root reducer for the application.
 * @returns A new persisted reducer.
 */
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const persistedReducerauthSlice = persistReducer(persistConfig, authSlice);

/**
 * Creates a Redux store with the provided persisted reducer.
 * @param {Object} persistedReducer - The persisted reducer object for the store.
 * @returns The configured Redux store.
 */
export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = store;
