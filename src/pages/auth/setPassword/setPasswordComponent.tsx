import React from "react";
import { useTranslation } from "react-i18next";
import useWindowDimension from "../../../components/hooks/useWindowDimension";
import AuthHeader from "../../../components/authHeader/authHeader";
import ResetPasswordSVG from "../../../components/authsvg/resetPasswordsvg";
import HookForm from "../../../components/hookForm/hookForm";
import TextField from "../../../components/textField/textField";
import CustomButton from "../../../components/customButton/customButton";
import CopyRight from "../../../components/copyRight/copyRight";
import "../auth.css";
import { resetForm } from "../../../interface/authInterface";

interface SetPasswordProps {
  resetForm: resetForm;
  multiErrorFields: object;
  onFormSubmit: (event: React.FormEvent) => void;
  busy: boolean;
  setConfirShowPassword: any;
  confirShowPassword: boolean;
  showPassword: boolean,
  setShowPassword: any
}

/**
 * Functional component for setting a new password.
 * @param {SetPasswordProps} props - The properties passed to the component.
 * @returns JSX element representing the set password component.
 */
const SetPasswordComponent: React.FC<SetPasswordProps> = (props) => {
  const { t } = useTranslation();
  const dimensions = useWindowDimension();
  const { resetForm, multiErrorFields, onFormSubmit, busy, setConfirShowPassword, confirShowPassword, showPassword, setShowPassword } = props;
 

  return (
    <React.Fragment>
      <div className="authPages" style={{ height: dimensions.height }}>
        <div className="authCenter">
          <div className="whiteBack">
            <AuthHeader
              headerTitle={t("SET_PASSWORD")}
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
                          setShowPassword((prev: boolean) => !prev)
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
                          setConfirShowPassword((prev: boolean) => !prev)
                        }
                        onChange={(e) => {
                          formMethod?.watch("password") &&
                            formMethod.trigger("password");
                        }}
                      />
                      <CustomButton
                        className="btnAuth"
                        title={t("SET_PASSWORD")}
                        disabled={!formMethod?.formState.isValid}
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

export default SetPasswordComponent;
