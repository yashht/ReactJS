import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface CustomSelectProps {
  options: { value: string; label: string }[];
  value: string | null; // add value prop
  onChange: (selectedValue: string) => void;
}

/**
 * Custom Select component that displays a dropdown list of options.
 * @param {CustomSelectProps} options - The list of options to display in the dropdown.
 * @param {string} value - The currently selected value.
 * @param {function} onChange - The function to call when an option is selected.
 * @returns A custom select dropdown component.
 */
const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
    setSelectedValue(selectedValue);
  };

  return (
    <div className="custom-select">
      <div className="selected-options" onClick={toggleDropdown}>
        {value ? (
          <i className={`icon icon-${value}`} />
        ) : (
          t("SELECT_ICON")
        )}
        <i className="icon icon-arrow_bottom"></i>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              className={selectedValue === option.label ? 'selected' : ''}
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              <i className={`icon icon-${option.label}`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;