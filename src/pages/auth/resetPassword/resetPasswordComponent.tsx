import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useWindowDimension from "../../../components/hooks/useWindowDimension";
import AuthHeader from "../../../components/authHeader/authHeader";
import ResetPasswordSVG from "../../../components/authsvg/resetPasswordsvg";
import HookForm from "../../../components/hookForm/hookForm";
import TextField from "../../../components/textField/textField";
import CustomButton from "../../../components/customButton/customButton";
import CopyRight from "../../../components/copyRight/copyRight";
import "../auth.css";
import { resetForm, resetParams } from "../../../interface/authInterface";

/**
 * Represents the props for the ResetPassword component.
 * @interface ResetPasswordProps
 * @property {object} multiErrorFields - The object containing multiple error fields.
 * @property {(event: resetParams) => void} onFormSubmit - The function to handle form submission.
 * @property {boolean} busy - Indicates whether the component is busy or not.
 */
interface ResetPasswordProps {
  resetForm: resetForm;
  multiErrorFields: object;
  onFormSubmit: (event: resetParams) => void;
  busy: boolean;
  setShowPassword: any;
  showPassword: boolean
  setConfirShowPassword: any
  confirShowPassword: boolean
}

/**
 * A React functional component for the Reset Password page.
 * @param {ResetPasswordProps} props - The props passed to the component.
 * @returns The JSX elements for the Reset Password page.
 */
const ResetPasswordComponent: React.FC<ResetPasswordProps> = (props) => {
  const { t } = useTranslation();
  const dimensions = useWindowDimension();
  const { resetForm, multiErrorFields, onFormSubmit, busy,   setShowPassword, showPassword, setConfirShowPassword, confirShowPassword } = props;


  return (
    <React.Fragment>
      <div className="authPages" style={{ height: dimensions.height }}>
        <div className="authCenter">
          <div className="whiteBack">
            <AuthHeader
              headerTitle={t("RESET_PASSWORD")}
              headerLogo={<ResetPasswordSVG />}
            />
            <div className="form">
              <HookForm defaultForm={{}} onSubmit={(e) => onFormSubmit(e)}>
                {(formMethod) => {
                  return (
                    <>
                      <TextField
                        label={t("NEW_PASSWORD")}
                        placeholder={t("ENTER_NEW_PASSWORD")}
                        autoFocus={false}
                        formMethod={formMethod}
                        rules={resetForm.password.validate}
                        name={resetForm.password.name}
                        errors={formMethod?.formState.errors}
                        type="password"
                        showPassword={showPassword}
                        togglePasswordVisibility={() =>
                          setShowPassword((prev: unknown) => !prev)
                        }
                        multiErrorFields={multiErrorFields}
                        onChange={(value) => {
                          formMethod?.watch("confirmpassword") &&
                            formMethod.trigger("confirmpassword");
                        }}
                      />
                      <TextField
                        label={t("CONFIRM_PASSWORD")}
                        placeholder={t("ENTER_CONFIRM_PASSWORD")}
                        autoFocus={false}
                        formMethod={formMethod}
                        // rules={resetForm.confirmpassword.validate}
                        rules={{
                          required: {
                            value: true,
                          },
                          validate: {
                            matchPassword: (value: string) =>
                              (value &&
                                value === formMethod?.watch("password")) ||
                              t("BOTH_PASSWORD_MUST_BE_MATCH"),
                          },
                        }}
                        name={resetForm.confirmpassword.name}
                        errors={formMethod?.formState.errors}
                        type="password"
                        showPassword={confirShowPassword}
                        togglePasswordVisibility={() =>
                          setConfirShowPassword((prev: unknown) => !prev)
                        }
                        onChange={(e) => {
                          formMethod?.watch("password") &&
                            formMethod.trigger("password");
                        }}
                      />
                      <CustomButton
                        className="btnAuth"
                        title={t("UPDATE")}
                        disabled={!formMethod?.formState.isValid}
                        loading={busy}
                      />
                    </>
                  );
                }}
              </HookForm>
              <div className="forgotpassCenter">
                <Link to="/sign" className="forgotPasswordLink">
                  {t("CANCEL")}
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

export default ResetPasswordComponent;
