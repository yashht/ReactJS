import React from "react";
import { useTranslation } from "react-i18next";
import OTPInput from "react-otp-input";
import useWindowDimension from "../../../components/hooks/useWindowDimension";
import AuthHeader from "../../../components/authHeader/authHeader";
import OTPVerificationSVG from "../../../components/authsvg/otpVerificationsvg";
import HookForm from "../../../components/hookForm/hookForm";
import CustomButton from "../../../components/customButton/customButton";
import { IotpInterface } from "../../../interface/authInterface";
import CopyRight from "../../../components/copyRight/copyRight";

import "../auth.css";

interface OTPVerificationProps {
  busy: boolean;
  onFormSubmit: (e: React.FormEvent) => void;
  digitValue: string;
  onOtpChange: (otp: string) => void;
  timer: number;
  handleResendClick: () => void;
  otpForm: IotpInterface;
  userEmail: string
}

/**
 * OTPVerificationComponent is a functional component that renders a form for OTP verification.
 * @param {OTPVerificationProps} props - The props object containing the necessary data and functions.
 * @returns {JSX.Element} - The JSX element representing the OTP verification form.
 */
const OTPVerificationComponent: React.FC<OTPVerificationProps> = (props) => {
  const { t } = useTranslation();
  const dimensions = useWindowDimension();
  const {
    busy,
    onFormSubmit,
    digitValue,
    onOtpChange,
    timer,
    handleResendClick,
    userEmail
  } = props;

  return (
    <React.Fragment>
      <div className="authPages" style={{ height: dimensions.height }}>
        <div className="authCenter">
          <div className="whiteBack">
            <AuthHeader
              headerTitle={t("VERIFICATION")}
              headerLogo={<OTPVerificationSVG />}
              headerDescription={t("4_DIGIT_VERIFICATION_CODE")}
            />
            <div className="form">
              <p className="emailText mb-4">{userEmail}</p>
              <HookForm defaultForm={{}} onSubmit={(e) => onFormSubmit(e)}>
                {(formMethod) => {
                  return (
                    <>
                      <OTPInput
                        onChange={onOtpChange}
                        value={digitValue}
                        numInputs={4}
                        inputType={"tel"}
                        renderSeparator={(): JSX.Element => <span> </span>}
                        containerStyle="otp-container mb-4"
                        inputStyle={
                          digitValue
                            ? "otpInputFillStyle"
                            : "otp-input-none-style"
                        }
                        renderInput={(inputProps, index) => (
                          <input {...inputProps} key={index} />
                        )}
                      />
                      <div className="resend-code-style mb-4">
                        {t("DIDNT_RECEIVE_THE_CODE")}
                        {timer > 0 ? (
                          <p className="resend-code-timer-style">
                            {t("RESEND_CODE_IN")}
                            <span>{timer}s</span>
                          </p>
                        ) : (
                          <span onClick={handleResendClick}>
                            {t("RESEND_CODE")}
                          </span>
                        )}
                      </div>
                      <CustomButton
                        title={t("VERIFY")}
                        disabled={digitValue?.length < 4}
                        loading={busy}
                      />
                    </>
                  );
                }}
              </HookForm>
            </div>
          </div>
          <p className="copyrightTitle">© <CopyRight /> {t("COPYRIGHTSTEXT")}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OTPVerificationComponent;
