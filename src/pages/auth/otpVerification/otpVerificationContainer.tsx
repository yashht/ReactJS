import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { showToast } from "../../../store/features/toast/toastSlice";
import OTPVerificationComponent from "./otpVerificationComponent";
import Constant from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../store/features/auth/authSlice";
import { AppDispatch } from "../../../interface/authInterface";
import { RootState } from "../../../store";

/**
 * A container component for OTP verification.
 * @returns JSX element containing the OTP verification component.
 */
const OTPVerificationContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);
  const [digitValue, setDigitValue] = useState("");
  const [timer, setTimer] = useState(0);
  const userEmail = useSelector((state: RootState) => state?.auth?.forgotResponse?.data?.email)
  const verifyOtp = window.sessionStorage.getItem(Constant.SESSIONSTORAGEKEYS.OTP)
  const resendOtp = window.sessionStorage.getItem(Constant.SESSIONSTORAGEKEYS.RESENDOTP)
  const getForgotTime: string | null = window.sessionStorage.getItem('expireTime')
  const otpExpireTimestamp = new Date((getForgotTime || "")).getTime();
  const currentTimestamp = Date.now();
  const isOTPExpired = currentTimestamp < otpExpireTimestamp;
  
  
  

  /**
   * Handles the change event of an OTP input field.
   * @param {string} value - The new value of the OTP input field.
   * @returns None
   */
  const onOtpChange = (value: string) => {
    if (value?.length < digitValue?.length) {
      setDigitValue(value);
    } else {
      if (digitValue?.length === value?.length - 1) {
        setDigitValue(value);
      }
    }
  };

  /**
   * Handles the click event for resending a forgot password email.
   * Dispatches the forgotPassword action and handles the result.
   * Updates session storage with relevant data.
   * Displays a toast message and sets a timer.
   * @returns None
   */
  const handleResendClick = () => {
    dispatch(forgotPassword(userEmail)).then((resultAction) => {
      if(forgotPassword.fulfilled.match(resultAction)) {
        const timeandDate = new Date ()
        const expireTime = new Date(timeandDate.getTime() + 2 * 60 * 1000)
        window.sessionStorage.setItem(Constant.SESSIONSTORAGEKEYS.EXPIRE_TIME, (expireTime as any));
        window.sessionStorage.setItem(Constant.SESSIONSTORAGEKEYS.RESENDOTP, (resultAction as any).payload.data.otp);
        window.sessionStorage.setItem(Constant.SESSIONSTORAGEKEYS.RESET_TOKEN, (resultAction as any)?.payload.data?.token);
        window.sessionStorage.setItem(Constant.SESSIONSTORAGEKEYS.OTP, "");
        dispatch(
          showToast({
            message: t("A_CODE_RESENT_EMAIL_ADDRESS"),
            type: "info",
          })
        );
        setTimer(30);
      } else if (forgotPassword.rejected.match(resultAction)) {
        setBusy(false);
        dispatch(showToast({
          message:  (resultAction as any)?.error?.message,
          type: "error",
        }),
      );
      }
     })   
  };

  /**
   * An object representing an OTP (One-Time Password) form.
   * @property {object} otp - The OTP field configuration.
   * @property {string} otp.name - The name of the OTP field.
   * @property {object} otp.validate - The validation rules for the OTP field.
   * @property {object} otp.validate.required - The required validation rule for the OTP field.
   * @property {boolean} otp.validate.required.value - The value indicating if the OTP field is required.
   */
  const otpForm = {
    otp: {
      name: "otp",
      validate: {
        required: {
          value: true,
        },
      },
    },
  };

  /**
   * useEffect hook that starts a countdown timer and clears the timer when it reaches 0.
   * @param {number} timer - The initial value of the timer.
   * @returns None
   */
  useEffect(() => {
    if (timer > 0) {
      const timerID = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearTimeout(timerID);
      };
    }
  }, [timer]);

  /**
   * Handles the form submission event.
   * - Sets the busy state to true.
   * - Checks if the entered digit value matches the verifyOtp or resendOtp values and if the OTP is expired.
   *   - If true, displays a success toast message and sets the busy state to false.
   *     - Clears the resendOTP session storage.
   *     - Navigates to the reset password page.
   *   - If false, checks if the current timestamp is greater than the OTP expire timestamp.
   *     - If true, displays an error toast message indicating that the OTP has expired and sets the busy state to false.
   *     - If false, displays an error toast message indicating that the entered code is incorrect and sets the busy state
   */
  const onFormSubmit = async () => {
    setBusy(true);
    if ((digitValue === verifyOtp || digitValue === resendOtp) && isOTPExpired ) {
      const message = `${t("CODE_VERIFIED_SUCCESSFULLY")} <strong>${t(
        "PLEASE_RESET_YOUR_PASSWORD"
        )}</strong>`;
        dispatch(
          showToast({
            message,
            type: "success",
          })
          );
          setBusy(false);
          window.sessionStorage.setItem(Constant.SESSIONSTORAGEKEYS.RESENDOTP, "");
          navigate("/resetpassword"); 
    } else if (currentTimestamp > otpExpireTimestamp) {      
      const message = `${t("OTP_EXPIRED")} <strong>${t(
        "PLZ_RESEND_CODE"
      )}</strong>`;
      dispatch(
        showToast({
          message,
          type: "error",
        })
      );
      setBusy(false);  
    } else {
      const message = `${t("INCORRECT_CODE")} <strong>${t(
        "PLZ_RECHECK_YOUR_CODE"
      )}</strong>`;
      dispatch(
        showToast({
          message,
          type: "error",
        })
      );
      setBusy(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>OTP Verification | Giving For Living</title>
        <meta name="description" content="Sign || Giving For Living" />
      </Helmet>
      <OTPVerificationComponent
        busy={busy}
        onFormSubmit={onFormSubmit}
        digitValue={digitValue}
        onOtpChange={onOtpChange}
        timer={timer}
        handleResendClick={handleResendClick}
        otpForm={otpForm}
        userEmail={userEmail}
      />
    </>
  );
};

export default OTPVerificationContainer;
