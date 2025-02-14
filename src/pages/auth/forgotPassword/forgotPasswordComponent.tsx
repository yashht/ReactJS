import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useWindowDimension from "../../../components/hooks/useWindowDimension";
import AuthHeader from "../../../components/authHeader/authHeader";
import ForgotSVG from "../../../components/authsvg/forgotsvg";
import HookForm from "../../../components/hookForm/hookForm";
import TextField from "../../../components/textField/textField";
import CustomButton from "../../../components/customButton/customButton";
import CopyRight from "../../../components/copyRight/copyRight";
import { forgotParams, IForgotForm } from "../../../interface/authInterface";
import "../auth.css";

interface ForgotPasswordProps {
  forgotForm: IForgotForm;
  onFormSubmit: (event: forgotParams) => void;
  busy: boolean;
}

/**
 * A functional component that renders a forgot password form.
 * @param {ForgotPasswordProps} props - The props for the component.
 * @returns The JSX elements representing the forgot password form.
 */
const ForgotPasswordComponent: React.FC<ForgotPasswordProps> = (props) => {
  const { t } = useTranslation();
  const dimensions = useWindowDimension();
  const { forgotForm, onFormSubmit, busy } = props;

  return (
    <React.Fragment>
      <div className="authPages" style={{ height: dimensions.height }}>
        <div className="authCenter">
          <div className="whiteBack">
            <AuthHeader
              headerTitle={t("FORGOT_PASSWORD")}
              headerDescription={t("EMAIL_WITH_OTP")}
              headerLogo={<ForgotSVG />}
            />
            <div className="form">
              <HookForm defaultForm={{}} onSubmit={(e) => onFormSubmit(e)}>
                {(formMethod) => {
                  return (
                    <>
                      <TextField
                        label={t("EMAIL_ADDRESS")}
                        placeholder={t("ENTER_EMAIL_ADDRESS")}
                        autoFocus={true}
                        formMethod={formMethod}
                        rules={forgotForm.email.validate}
                        name={forgotForm.email.name}
                        errors={formMethod?.formState.errors}
                        type="text"
                      />
                      <CustomButton
                        className="btnAuth"
                        title={t("SUBMIT")}
                        disabled={!formMethod?.formState.isValid}
                        loading={busy}
                      />
                    </>
                  );
                }}
              </HookForm>
              <div className="forgotpassCenter">
                <Link to="/sign" className="forgotPasswordLink">
                  <i className="icon icon-arrow_long_left" />
                  {t("BACK_TO_SIGN_IN")}
                </Link>
              </div>
            </div>
          </div>
          <p className="copyrightTitle">© <CopyRight /> {t("COPYRIGHTSTEXT")}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPasswordComponent;
