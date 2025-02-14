import React, { ChangeEvent, MouseEvent } from "react";

interface CustomToggleButtonProps {
  onCheckChange?: (checked: boolean) => void;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  checked: boolean;
  id: string;
  checkboxClass?: string
}

/**
 * A custom toggle button component that can be used in React applications.
 * @param {CustomToggleButtonProps} props - The properties passed to the component.
 * @returns JSX element representing the custom toggle button.
 */
const CustomToggleButton: React.FC<CustomToggleButtonProps> = (props) => {
  const { checkboxClass, onCheckChange, onClick, checked, id } = props;

  const onToggleButtonChecked = (e: ChangeEvent<HTMLInputElement>) => {
    return onCheckChange && onCheckChange(e.target.checked);
  };

  return (
    <>
      <div className={`checkbox ` + checkboxClass}>
        <input
          type="checkbox"
          className="form-check-input"
          id={id}
          checked={checked}
          onClick={onClick}
          onChange={onToggleButtonChecked}
        />
        <label htmlFor={id}></label>
      </div>
    </>
  );
};

export default CustomToggleButton;




// import React, { ChangeEvent, MouseEvent } from "react";

// interface CustomToggleButtonProps {
//   onCheckChange?: (checked: boolean) => void;
//   onClick?: (event: MouseEvent<HTMLInputElement>) => void;
//   checked: boolean;
//   id: string;
// }

// const CustomToggleButton: React.FC<CustomToggleButtonProps> = (props) => {
//   const { onCheckChange, onClick, checked, id } = props;

//   const onToggleButtonChecked = (e: ChangeEvent<HTMLInputElement>) => {
//     return onCheckChange && onCheckChange(e.target.checked);
//   };

//   return (
//     <>
//       <div className="form-check form-switch form-switch-md">
//         <input
//           type="checkbox"
//           className="form-check-input"
//           id={id}
//           checked={checked}
//           onClick={onClick}
//           onChange={onToggleButtonChecked}
//         />
//       </div>
//     </>
//   );
// };

// export default CustomToggleButton;
