import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useWindowDimension from "../../../components/hooks/useWindowDimension";
import AuthHeader from "../../../components/authHeader/authHeader";
import SignInsvg from "../../../components/authsvg/signInsvg";
import HookForm from "../../../components/hookForm/hookForm";
import TextField from "../../../components/textField/textField";
import CustomButton from "../../../components/customButton/customButton";
import CheckBox from "../../../components/checkBox/checkBox";
import CopyRight from "../../../components/copyRight/copyRight";
import Constant from "../../../utils/constant";
import { ILoginForm, signInParams } from "../../../interface/authInterface";

import "../auth.css";

interface SignInProps {
  signInForm: ILoginForm;
  onFormSubmit: (event: signInParams) => void;
  busy: boolean;
  setShowPassword: any;
  showPassword: boolean
  rememberMeFunction: (value: boolean) => void,
  rememberMe: boolean
}

/**
 * A functional component that represents a sign-in form.
 * @param {SignInProps} props - The props for the sign-in component.
 * @returns The sign-in form JSX.
 */
const SignInComponent: React.FC<SignInProps> = (props) => {
  const { t } = useTranslation();
  const dimensions = useWindowDimension();
  const { signInForm, onFormSubmit, busy, rememberMeFunction, rememberMe, setShowPassword, showPassword } = props;
  
  return (
    <React.Fragment>
      <div className="authPages" style={{ height: dimensions.height }}>
        <div className="authCenter">
          <div className="whiteBack">
            <AuthHeader
              headerTitle={t("HELLO_SUPER_ADMIN")}
              headerSubText={t("SIGN_IN_TO_CONTINUE")}
              headerLogo={<SignInsvg />}
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
                        rules={signInForm.email.validate}
                        name={signInForm.email.name}
                        errors={formMethod?.formState.errors}
                        defaultValue={window.sessionStorage.getItem(Constant.SESSIONSTORAGEKEYS.GFTL_EMAIL) as string}
                        value={window.sessionStorage.getItem(Constant.SESSIONSTORAGEKEYS.GFTL_EMAIL)}
                        type="text"
                      />
                      <TextField
                        label={t("PASSWORD")}
                        placeholder={t("ENTER_PASSWORD")}
                        autoFocus={false}
                        formMethod={formMethod}
                        rules={signInForm.password.validate}
                        name={signInForm.password.name}
                        errors={formMethod?.formState.errors}
                        type="password"
                        value={window.sessionStorage.getItem(Constant.SESSIONSTORAGEKEYS.GFTL_PASSWORD)}
                        defaultValue={window.sessionStorage.getItem(Constant.SESSIONSTORAGEKEYS.GFTL_PASSWORD) as string}
                        showPassword={showPassword}
                        togglePasswordVisibility={() =>
                          setShowPassword((prev: unknown) => !prev)
                        }
                      />
                      <CheckBox
                        checkboxClass="form-check-input"
                        id="rememberMe"
                        labelTitle={t("REMEMBER_ME")}
                        checked={rememberMe}
                        onCheckedChange={(checked) => rememberMeFunction(checked)}
                      />
                      <CustomButton
                        className="btnAuth"
                        title={t("SIGN_IN")}
                        disabled={!formMethod?.formState.isValid}
                        loading={busy}
                      />
                    </>
                  );
                }}
              </HookForm>
              <div className="forgotpassCenter">
                <Link to="/forgotpassword" className="forgotPasswordLink">
                  <i className="icon icon-lock" />
                  {t("FORGOT_YOUR_PASSWORD")}
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

export default SignInComponent;
