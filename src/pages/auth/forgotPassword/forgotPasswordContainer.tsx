import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../store/features/toast/toastSlice";
import Constant from "../../../utils/constant";
import ForgotPasswordComponent from "./forgotPasswordComponent";
import { forgotPassword } from "../../../store/features/auth/authSlice";
import { AppDispatch, forgotParams } from "../../../interface/authInterface";

/**
 * Container component for the Forgot Password feature.
 * @returns JSX element containing the Forgot Password component.
 */
const ForgotPasswordContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  window.sessionStorage.setItem(Constant.SESSIONSTORAGEKEYS.RESENDOTP, '')
  window.sessionStorage.setItem(Constant.LOCALSTORAGEKEYS.RESET_PASS, '');
  const [busy, setBusy] = useState(false);

  /**
   * Handles the form submission for the forgot password feature.
   * @param {ForgotParams} value - The form values submitted by the user.
   * @returns None
   */
  const onFormSubmit = async (value: forgotParams) => { 
    setBusy(true);
    dispatch(forgotPassword(value)).then((resultAction) => {
      if(forgotPassword.fulfilled.match(resultAction)) {
        const timeandDate = new Date ()
        const expireTime = new Date(timeandDate.getTime() + 2 * 60 * 1000)
        window.sessionStorage.setItem(Constant.SESSIONSTORAGEKEYS.EXPIRE_TIME, (expireTime as any));
        window.sessionStorage.setItem(Constant.SESSIONSTORAGEKEYS.OTP, (resultAction as any).payload.data.otp);
        window.sessionStorage.setItem(Constant.SESSIONSTORAGEKEYS.RESET_TOKEN, (resultAction as any)?.payload.data?.token);
        dispatch(
          showToast({
            message: (resultAction as any)?.payload?.message,
            type: "success",
          })
        );
        setBusy(false);
        navigate("/otp");
      } else if (forgotPassword.rejected.match(resultAction)) {
        setBusy(false);
        dispatch(showToast({
          message:  resultAction.error.message ?? '',
          type: "error",
        }),
      );
      }
     })
  };

  /**
   * An object representing a forgot password form with validation rules for the email field.
   * @constant {Object} forgotForm
   * @property {Object} email - The email field configuration.
   * @property {string} email.name - The name of the email field.
   * @property {Object} email.validate - The validation rules for the email field.
   * @property {Object} email.validate.required - The required validation rule for the email field.
   * @property {boolean} email.validate.required.value - Indicates if the email field is required.
   * @property {Object} email.validate.pattern - The pattern validation rule for the email field.
   * @property {string} email.validate.pattern.value - The regular expression pattern for validating the email field.
   */
  const forgotForm = {
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
          message: t("MAXIMUM_CHARACTERS"),
        },
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Giving For Living</title>
        <meta name="description" content="Sign || Giving For Living" />
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <ForgotPasswordComponent
        forgotForm={forgotForm}
        onFormSubmit={onFormSubmit}
        busy={busy}
      />
    </>
  );
};

export default ForgotPasswordContainer;
