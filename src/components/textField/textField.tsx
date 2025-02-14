import React, { FC, ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { Form } from "react-bootstrap";

interface TextFieldProps {
  formMethod: any;
  errors: any;
  value?: any;
  label?: any;
  placeholder?: string;
  type: string;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  textarea?: any;
  name: string;
  autoFocus?: boolean;
  multiErrorFields?: any;
  disabled?: boolean;
  handleFocus?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur?: () => void;
  maxLength?: number;
  minLength?: number;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  rules: any;
  rows?: number;
  defaultValue?: string;
  readOnly?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  onClick?: () => void;
  ref?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  countVisible?: boolean;
  count?: any;
  countTotal?: number;
  isReqired?: boolean;
  titleText?: string; 
  title?: boolean;
  className?: any;
}

/**
 * Functional component for a text field input with various props for customization.
 * @param {TextFieldProps} props - The props for the text field component.
 * @returns JSX element representing the text field input.
 */
const TextField: FC<TextFieldProps> = (props) => {
  const {
    errors,
    label,
    placeholder,
    multiErrorFields,
    disabled,
    type,
    textarea,
    name,
    autoFocus,
    handleFocus,
    handleBlur,
    maxLength,
    minLength,
    onKeyDown,
    formMethod,
    rows,
    defaultValue,
    rules,
    readOnly,
    required,
    min,
    max,
    onClick,
    onChange,
    showPassword,
    togglePasswordVisibility,
    countVisible,
    count,
    countTotal,
    isReqired = true,
    titleText,
    title,
    className
  } = props;

  const hasError = errors[name] !== undefined;

  return (
    <div className={ className + " formGroup"}>
      <Controller
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <>
          {label &&
            <label className="formlabel">
              {label}
              {isReqired &&
              <span>*</span>
              }
            </label>
            }
            { title && <span className="lightTextTitle">{titleText}</span> }
            <div className={type === "password" ? "group inline" : "group"}>
              <Form.Control
                className={`${hasError ? "is-invalid" : ""} ${
                  value &&
                  rules.pattern &&
                  rules.pattern.value &&
                  rules.pattern.value.test(value)
                    ? "regex-match-class"
                    : ""
                }`}
                name={name}
                placeholder={placeholder}
                autoFocus={autoFocus}
                disabled={disabled}
                autoComplete="off"
                required={required}
                type={type === "password" && showPassword ? "text" : type}
                readOnly={readOnly}
                onBlur={handleBlur}
                onKeyDown={onKeyDown}
                maxLength={maxLength}
                minLength={minLength}
                min={min}
                max={max}
                onFocus={(e) => {
                  handleFocus && handleFocus(e);
                }}
                defaultValue={defaultValue}
                onChange={(e) => {
                  onChange && onChange(e.target.value.trimLeft());
                  props.onChange && props.onChange(e);
                }}
                onClick={onClick}
                value={formMethod.watch(name) || value ? value : ""}
                as={textarea}
                rows={rows}
              />
              {countVisible && (
                <span className="count">
                  {count} / {countTotal}
                </span>
              )}
              {type === "password" && (
                <div
                  onClick={togglePasswordVisibility}
                  // className={`togglePasswordButton ${!value ? "disabled" : ""}`}
                  className={`togglePasswordButton ${
                    !value ? "disabled" : ""
                  } ${hasError ? "invalid" : ""}`}
                >
                  {showPassword ? (
                    <i className="icon icon-visibility" />
                  ) : (
                    <i className="icon icon-visibility_off" />
                  )}
                </div>
              )}
            </div>
          </>
        )}
        name={name}
        control={formMethod?.control}
        rules={rules}
      />
      {multiErrorFields?.length > 0 ? (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ messages }) => {
            if (messages) {
              const isMultipleError = Object.keys(messages).every(
                (errKey) =>
                  multiErrorFields.filter(
                    (m: { [x: string]: undefined }) => m[errKey] !== undefined
                  ).length > 0
              );
              if (isMultipleError) {
                const arr: JSX.Element[] = [];
                for (const fieldError of multiErrorFields) {
                  const key = Object.keys(fieldError)[0];
                  const success = Object.keys(messages).includes(key);
                  arr.push(
                    <span className={success ? "red" : "green"} key={key}>
                      {fieldError[key]}
                    </span>
                  );
                }
                return (
                  <div className="errorMsg 2 show passwordcustom">{arr}</div>
                );
              } else {
                return (
                  <div className="errorMsg 1 show">
                    <i className="icon-error_outline" />
                    {errors[name]?.message}
                  </div>
                );
              }
            } else {
              return <div className="errorMsg 3"></div>;
            }
          }}
        />
      ) : hasError ? (
        <div className="errorMsg 4 show">
          <span>{errors[name]?.message}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

/**
 * Default props for the TextField component.
 * @type {object}
 * @property {boolean} autoFocus - Whether the field should be focused on mount.
 * @property {string} value - The initial value of the field.
 * @property {object} errors - Any errors associated with the field.
 * @property {array} multiErrorFields - Fields that have multiple errors.
 * @property {boolean} readOnly - Whether the field is read-only.
 * @property {boolean} required - Whether the field is required.
 */
TextField.defaultProps = {
  autoFocus: false,
  value: "",
  errors: {},
  multiErrorFields: [],
  readOnly: false,
  required: true,
};

export default TextField;
