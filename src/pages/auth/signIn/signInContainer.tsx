import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { showToast } from "../../../store/features/toast/toastSlice";
import SignInComponent from "./signInComponent";
import Constant from "../../../utils/constant";
import { signIn } from "../../../store/features/auth/authSlice";
import { AppDispatch, signInParams } from "../../../interface/authInterface";


/**
 * A container component for the sign-in functionality.
 * @returns The sign-in container component.
 */
const SignInContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

    /**
     * useEffect hook that checks if the "Remember Me" option is enabled in the session storage
     * and updates the state accordingly.
     * @returns None
     */
    useEffect(() => {
      if (window.sessionStorage.getItem(Constant.SESSIONSTORAGEKEYS.REMEMBER_ME) === 'true') {
          setRememberMe(true)
      }
      localStorage.clear()
  }, []);


  /**
   * Updates the "remember me" value in the application state.
   * @param {boolean} value - The new value for the "remember me" checkbox.
   * @returns None
   */
  const rememberMeFunction = (value: boolean) => {
        setRememberMe(value)
  }

  /**
   * Handles the form submission for signing in a user.
   * @param {signInParams} value - The sign in parameters containing the user's email and password.
   * @returns None
   */
  const onFormSubmit = async (value: signInParams) => {
    setBusy(true);
    dispatch(signIn(value)).then((resultAction: any) => {            
      if (signIn.fulfilled.match(resultAction as any)) {        
        dispatch(
          showToast({
            message: resultAction.payload?.message,
            type: "success",
          })
        );
        window.localStorage.setItem(
          Constant.LOCALSTORAGEKEYS.ACCESSTOKEN,
          resultAction.payload.data.accesstoken
        );
        window.localStorage.setItem(
          Constant.LOCALSTORAGEKEYS.REFRESHTOKEN,
          resultAction?.payload?.data.refreshtoken
        );
        window.localStorage.setItem(
          Constant.LOCALSTORAGEKEYS.USER_ROLE,
          resultAction?.payload?.data.role
        );
        window.sessionStorage.setItem(
          Constant.SESSIONSTORAGEKEYS.REMEMBER_ME,
          String(rememberMe)
        );
        setBusy(false);
        if (resultAction?.payload?.data.role === 'Manager') {
          navigate("/program");
        } else {
          navigate("/causemanagement");
        }
        
        if (rememberMe === true) {
          window.sessionStorage.setItem(
              Constant.SESSIONSTORAGEKEYS.GFTL_EMAIL,
            value?.email
          );
          window.sessionStorage.setItem(
              Constant.SESSIONSTORAGEKEYS.GFTL_PASSWORD,
            value?.password
          );
        } else {
          window.sessionStorage.setItem(
              Constant.SESSIONSTORAGEKEYS.GFTL_EMAIL,
            ""
          );
          window.sessionStorage.setItem(
              Constant.SESSIONSTORAGEKEYS.GFTL_PASSWORD,
            ""
          );
        }
      } else if (signIn.rejected.match(resultAction)) {    
        setBusy(false);
        dispatch(
          showToast({
            message: resultAction.error.message ?? '',
            type: "error",
          })
        );
      }
    })
  };

  /**
   * An object representing a sign-in form with validation rules for each field.
   * @property {object} email - The email field configuration.
   * @property {string} email.name - The name of the email field.
   * @property {object} email.validate - The validation rules for the email field.
   * @property {object} email.validate.required - The required validation rule for the email field.
   * @property {boolean} email.validate.required.value - The value indicating if the email field is required.
   * @property {object} email.validate.pattern - The pattern validation rule for the email field.
   * @property {string} email.validate.pattern.value - The regular expression pattern for validating the email field.
   * @property {string} email.validate
   */
  const signInForm = {
    email: {
      name: "email",
      validate: {
        required: {
          value: true,
        },
        pattern: {
          value: Constant.REGEX.EMAIL,
          message: t("ENTER_VALID_EMAIL_ADDRESS"),
        },
        maxLength: {
          value: 256,
          message: t("MAXIMUM_CHARACTERS_256"),
        },
      },
    },
    password: {
      name: "password",
      validate: {
        required: {
          value: true,
        },
        maxLength: {
          value: 256,
          message: t("MAXIMUM_CHARACTERS_256"),
        },
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Sign | Giving For Living</title>
        <meta name="description" content="Sign || Giving For Living" />
      </Helmet>
      <SignInComponent
        signInForm={signInForm}
        onFormSubmit={onFormSubmit}
        busy={busy}
        rememberMeFunction={rememberMeFunction}
        rememberMe={rememberMe}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
      />
    </>
  );
};

export default SignInContainer;
