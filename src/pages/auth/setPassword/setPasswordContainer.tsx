import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import SetPasswordComponent from "./setPasswordComponent";
import { showToast } from "../../../store/features/toast/toastSlice";
import Constant from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../interface/authInterface";
import { setPassword } from "../../../store/features/auth/authSlice";

/**
 * Functional component for the Reset Password container.
 * Handles the logic for resetting a user's password.
 * @returns JSX element containing the reset password form.
 */
const SetPasswordContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useParams();
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirShowPassword, setConfirShowPassword] = useState(false);
  /**
   * Handles form submission by setting the busy state, dispatching a setPassword action
   * with the provided value, and showing a toast message based on the result.
   * @returns None
   */
  const onFormSubmit = async (value: any) => {
    setBusy(true);
    const params = {
      setPassToken: token,
      password: value?.password
    }
    dispatch(setPassword(params)).then((resultAction) => {
      if (setPassword.fulfilled.match(resultAction)) {
        setBusy(false);
        dispatch(
          showToast({
            message: (resultAction as any)?.payload?.message,
            type: "success",
          })
        );
        navigate("/sign");
      } else if (setPassword.rejected.match(resultAction)) {
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
   * Object containing form validation rules for password and confirm password fields.
   * @type {Object}
   * @property {Object} password - Validation rules for the password field
   * @property {string} password.name - The name of the password field
   * @property {Object} password.validate - Validation rules for the password field
   * @property {Object} password.validate.required - Validation rule for required field
   * @property {boolean} password.validate.required.value - Indicates if the field is required
   * @property {Object} password.validate.validate - Additional validation rules for the password field
   * @property {Function} password.validate.validate.hasUppercase - Function to check for uppercase characters
   * @property {Function} password.validate.validate
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
   * An array of objects representing different error messages for multi-field validation.
   * Each object contains a key representing a specific validation rule and its corresponding error message.
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
        <title>Set Password | Giving For Living</title>
        <meta name="description" content="Set Password || Giving For Living" />
      </Helmet>
      <SetPasswordComponent
        resetForm={resetForm}
        multiErrorFields={multiErrorFields}
        onFormSubmit={onFormSubmit}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        confirShowPassword={confirShowPassword}
        setConfirShowPassword={setConfirShowPassword}
        busy={busy}
      />
    </>
  );
};

export default SetPasswordContainer;
