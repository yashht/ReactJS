import { FORGOT, RESET, SET_PASSWORD, SIGNIN } from "../../../api/endPoint";
import instance from "../../../helpers/axios";
import { forgotParams, resetParams, setPasswordParams, signInParams } from "../../../interface/authInterface";


/**
 * Sends a POST request to the SIGNIN endpoint with the provided email and password.
 * @param {signInParams} data - An object containing the email and password for signing in.
 * @returns A Promise that resolves to the response of the POST request.
 */
const signIn = (data: signInParams) => {
    return instance.post(SIGNIN, {
        emailid: data?.email,
        password: data?.password
    });
};

/**
 * Sends a request to the server to initiate the password reset process for the given email address.
 * @param {forgotParams} data - The data object containing the email address for password reset.
 * @returns A promise that resolves to the response from the server.
 */
const forgotPassword = (data: forgotParams) => {
    return instance.post(FORGOT, {
        emailid: data?.email || data
    })
}

/**
 * Sends a POST request to the server to reset the user's password.
 * @param {resetParams} data - An object containing the reset token and new password.
 * @returns A Promise that resolves to the response from the server.
 */
const resetPassword = (data: resetParams) => {
    return instance.post(RESET, {
        resetToken: data?.resetToken,
        password: data?.password
    })
}


/**
 * Sets a new password for a user using the provided reset token and password.
 * @param {setPasswordParams} data - An object containing the reset token and new password.
 * @returns A Promise that resolves to the result of the password reset request.
 */
const setPassword = (data: setPasswordParams) => {
    return instance.post(SET_PASSWORD, {
        setPassToken: data?.setPassToken,
        password: data?.password
    })
}



/**
 * An object containing authentication services.
 * @property {Function} signIn - A function for signing in.
 * @property {Function} forgotPassword - A function for requesting a password reset.
 * @property {Function} resetPassword - A function for resetting a password.
 */
const authServices = {
    signIn,
    forgotPassword,
    resetPassword,
    setPassword
};

export default authServices;

