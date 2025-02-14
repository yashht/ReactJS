import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import ResetPasswordComponent from "./resetPasswordComponent";
import { showToast } from "../../../store/features/toast/toastSlice";
import Constant from "../../../utils/constant";
import { resetPassword } from "../../../store/features/auth/authSlice";
import { AppDispatch, resetParams } from "../../../interface/authInterface";
import { useNavigate } from "react-router-dom";

/**
 * A container component for the Reset Password functionality.
 * @returns The ResetPasswordContainer component.
 */
const ResetPasswordContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const resetToken =   window.sessionStorage.getItem(Constant.SESSIONSTORAGEKEYS.RESET_TOKEN);
  const resetPass = window.sessionStorage.getItem(Constant.LOCALSTORAGEKEYS.RESET_PASS);
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirShowPassword, setConfirShowPassword] = useState<boolean>(false);

  /**
   * Executes a side effect when the value of `resetPass` changes.
   * If `resetPass` is equal to 'done', it navigates to the "/sign" route and clears the localStorage.
   * @param {string} resetPass - The value to monitor for changes.
   * @param {function} navigate - The function used to navigate to a different route.
   * @returns None
   */
  useEffect(() => {
    if (resetPass === 'done') {
        navigate("/sign");
    }
    if (!resetToken) {
      navigate("/sign");
    }
    localStorage.clear()
}, [resetPass, navigate, resetToken]);


  /**
   * Handles the form submission for resetting a password.
   * @returns None
   */
  const onFormSubmit = async (value: resetParams) => {
    setBusy(true);
    const params = {
      resetToken: resetToken,
      password: value?.password
  }
  dispatch(resetPassword(params)).then((resultAction: any) => {
    if (resetPassword.fulfilled.match(resultAction)) {
        setBusy(false);
        dispatch(
            showToast({
                message: (resultAction as any)?.payload?.message,
                type: "success",
            })
        );
        window.sessionStorage.setItem(Constant.LOCALSTORAGEKEYS.RESET_PASS, 'done')
        navigate("/sign");
    } else if (resetPassword.rejected.match(resultAction)) {
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
   * An object representing a form with password and confirmpassword fields.
   * Each field has a name and a set of validation rules.
   * @property {object} password - The password field.
   * @property {string} password.name - The name of the password field.
   * @property {object} password.validate - The validation rules for the password field.
   * @property {object} password.validate.required - The required validation rule for the password field.
   * @property {boolean} password.validate.required.value - Indicates if the password field is required.
   * @property {object} password.validate.validate - The additional validation rules for the password field.
   * @property {function} password.validate.validate.hasUppercase - The validation rule to
   */
  const resetForm = {
    password: {
      name: "password",
      validate: {
        required: {
          value: true,
        },
        validate: {
          hasUppercase: (value: string) =>
            value && value.match(Constant.REGEX.UPPERCASE) !== null,
          hasLowerCase: (value: string) =>
            value && value.match(Constant.REGEX.LOWERCASE) !== null,
          hasNumbers: (value: string) =>
            value && value.match(Constant.REGEX.NUMBER) !== null,
          hasSpecialChar: (value: string) =>
            value && value.match(Constant.REGEX.SPECIAL_CHARECTERS) !== null,
          length: (value: string) =>
            (value && value.length >= 8 && value.length <= 16) || "",
        },
        maxLength: {
          value: 256,
          message: t("MAXIMUM_CHARACTERS"),
        },
      },
    },
    confirmpassword: {
      name: "confirmpassword",
      validate: {
        required: {
          value: true,
        },
        maxLength: {
          value: 256,
          message: t("MAXIMUM_CHARACTERS"),
        },
      },
    },
  };

  /**
   * An array of objects representing multiple error fields for a password validation.
   * Each object contains a specific validation rule and its corresponding error message.
   * @type {Array<Object>}
   * @property {string} length - The error message for the minimum and maximum length requirement.
   * @property {string} hasSpecialChar - The error message for the requirement of at least one special character.
   * @property {string} hasNumbers - The error message for the requirement of at least one numeric character.
   * @property {string} hasUppercase - The error message for the requirement of at least one uppercase character.
   * @property {string} hasLowerCase - The error message for the requirement of at least one lowercase character.
   */
  const multiErrorFields = [
    { length: t("MUST_8_16") },
    { hasSpecialChar: t("MINIMUM_1_SPECIAL") },
    { hasNumbers: t("MINIMUM_1_NUMERIC") },
    { hasUppercase: t("MINIMUM_1_UPPERCASE") },
    { hasLowerCase: t("MINIMUM_1_LOWERCASE") },
  ];

  return (
    <>
      <Helmet>
        <title>Reset Password | Giving For Living</title>
        <meta name="description" content="Sign || Giving For Living" />
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <ResetPasswordComponent
        resetForm={resetForm}
        multiErrorFields={multiErrorFields}
        onFormSubmit={onFormSubmit}
        busy={busy}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        setConfirShowPassword={setConfirShowPassword}
        confirShowPassword={confirShowPassword}
      />
    </>
  );
};

export default ResetPasswordContainer;
