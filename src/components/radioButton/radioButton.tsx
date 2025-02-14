import React from "react";
/**
 * A custom radio button component.
 * @param {Object} props - The props object containing the following properties:
 *   - {Function} changed - The event handler function for when the radio button is changed.
 *   - {string} id - The unique identifier for the radio button.
 *   - {boolean} isSelected - Indicates whether the radio button is selected.
 *   - {string} label - The label text for the radio button.
 *   - {string} value - The value of the radio button.
 *   - {boolean} disabled - Indicates whether the radio button is disabled.
 * @returns The rendered radio button component.
 */
interface RadioButtonProps {
    onChange: (event: any) => void;
    id?: any;
    isSelected?:any,
    label?:any,
    value?:any,
    disabled?:any,
    name?:any;
  }
  
    const RadioButton: React.FC<RadioButtonProps> = (props) => {
    
    const { onChange, id, isSelected, label, value, disabled, name } = props;
    return (
        <>
            <div className={disabled ? "disablebutton  radioButton" : " radioButton"} >
                <input
                    id={id}
                    onChange={onChange}
                    value={value}
                    name={name}
                    type="radio"
                    checked={isSelected}
                    disabled={disabled}
                />
                <label htmlFor={id} className={isSelected && "isSelected"}>{label}</label>
            </div>
        </>
    );
};
export default RadioButton;