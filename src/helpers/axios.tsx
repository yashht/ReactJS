import axios from 'axios';
import { get } from 'lodash';
import Constant from '../utils/constant';

/**
 * Create a new Axios instance with a base URL set to the value of the environment variable REACT_APP_BASE_URL.
 * @returns A new Axios instance with the specified base URL.
 */
const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});
let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

// Process all failed request
/**
 * Process the failed queue by either rejecting the promises with the given error or resolving them with the given token.
 * @param {Error} error - The error object to reject the promises with.
 * @param {string} token - The token to resolve the promises with.
 * @returns None
 */
const processQueue = (error: any, token: any) => {
    failedQueue.forEach(prom => {
        if (error) { prom.reject(error); } else { prom.resolve(token); }
    });
    failedQueue = [];
};

/**
 * Interceptor function that adds the access token to the request headers.
 * @param {Object} config - The request configuration object.
 * @returns The modified request configuration object with the access token added to the headers.
 */
instance.interceptors.request.use(config => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) { config.headers.authorization = accessToken; }
    return config;
});


/**
 * Interceptor function that handles responses and errors from API requests.
 * @param {function} response - The response object from the API request.
 * @param {function} error - The error object from the API request.
 * @returns The response data if successful, or rejects the error if unsuccessful.
 */
instance.interceptors.response.use(
    response => {
        return response?.data
    },
    error => {
        
        const originalRequest = error.config;
        const responseStatus = get(error, 'response.status', '');
        // If refresh token fails
        if ((responseStatus === 403 || responseStatus === 410) && window.localStorage.getItem("accessToken") !== null ) {
            window.location.href = '/';
            localStorage.clear();
        } 
        // if (!window.localStorage.getItem(Constant.LOCALSTORAGEKEYS.ACCESSTOKEN)) {
        //     window.location.href = '/';
        //     }

        if (responseStatus === 401 && error.config.url.indexOf('refresh-token') !== -1) {
            processQueue(error, null);
            isRefreshing = false;
            return Promise.reject(error);
        }

        if (responseStatus === 401 && error.config.url.indexOf('signin') !== -1) {
            return Promise.reject(error);
        }

        if (responseStatus === 401 && localStorage.getItem('accessToken') === '') {
            window.location.href = '/';
        }

        // Check if original request
        if (responseStatus === 401 && !originalRequest._retry) {
            // Push all the failed request due to expired token in queue
            if (isRefreshing) {
                return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
                    .then(token => {
                        originalRequest.headers["Authorization"] = 'Token ' + token;
                        return instance(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            // Try to refresh token
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.REACT_APP_BASE_URL}auth/refreshtoken`, { refreshToken: window.localStorage.getItem(Constant.LOCALSTORAGEKEYS.REFRESHTOKEN) })
                    .then( response => {
                        const token = get(response.data.data, "accesstoken", "");
                        window.localStorage.setItem("accessToken", response.data.data.accesstoken);
                        window.localStorage.setItem("refreshToken", response.data.data.refreshtoken);
                        instance.defaults.headers.common["Authorization"] = token;
                        originalRequest.headers["Authorization"] = token;
                            processQueue(null, token);
                            resolve(instance(originalRequest));
                    })
                   
                    .catch(err => {
                        processQueue(err, null);
                        reject(err);
                        window.location.href = '/';
                    })
                    /*
                        Finally set isRefreshing token to false in either success or failure
                    */
                    // eslint-disable-next-line
                    .finally(() => isRefreshing = false);
            });
        } else {
            
            return Promise.reject(error?.response?.data);
        }

    }
);


export default instance;

