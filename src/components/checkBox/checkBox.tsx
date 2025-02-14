import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";

interface CheckBoxProps {
  labelTitle?: string;
  boldText?: boolean;
  boldTextLable?: string;
  labelTitleEnd?: string;
  id?: string;
  onCheckedChange?: (checked: boolean) => void;
  register?: React.RefObject<HTMLInputElement>;
  name?: string;
  disabled?: boolean;
  checkboxClass?: string;
  checked?: boolean;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
}

/**
 * Functional component representing a checkbox input in a React application.
 * @param {CheckBoxProps} props - The properties passed to the CheckBox component.
 * @returns JSX element representing a checkbox with the specified properties.
 */
const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const {
    labelTitle,
    id,
    onCheckedChange,
    register,
    name,
    disabled,
    checkboxClass,
    boldText,
    onClick,
    boldTextLable,
    labelTitleEnd
  } = props;
  const [checked, setChecked] = useState<boolean>(props.checked || false);

  useEffect(() => {
    setChecked(props.checked || false);
  }, [props.checked]);

  const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onCheckedChange && onCheckedChange(e.target.checked);
  };

  return (
    <div className="checkbox-main">
      <input
        type="checkbox"
        ref={register}
        disabled={disabled}
        name={name}
        value={labelTitle}
        id={id}
        className={"checkbox " + checkboxClass}
        checked={checked}
        onChange={onChecked}
        onClick={onClick}
      />
      {checked ? (
        <i className="icon icon-checked"></i>
      ) : (
        <i className="icon icon-unchecked"></i>
      )}
      {labelTitle && 
        <label className="checkboxLabel" id="checkLabel" htmlFor={id}>
          {labelTitle} {boldText && <span className="darkText">{boldTextLable}</span>} {labelTitleEnd}
        </label>
      }
    </div>
  );
};

/**
 * Default props for the CheckBox component.
 * @type {object}
 * @property {string} id - The id of the checkbox.
 * @property {boolean} checked - The initial checked state of the checkbox.
 * @property {string} labelTitle - The title of the checkbox label.
 */
CheckBox.defaultProps = {
  id: "",
  checked: false,
  labelTitle: "",
};

export default CheckBox;
