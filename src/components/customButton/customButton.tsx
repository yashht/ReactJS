import React, { ReactNode, KeyboardEvent, MouseEvent } from "react";
import Loader from "../../assets/images/giphy.gif";

interface CustomButtonProps {
  title: any;
  children?: ReactNode;
  disabled?: any;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  className?: string;
  icon?: ReactNode;
  id?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * CustomButton component that renders a button with customizable properties.
 * @param {CustomButtonProps} props - The properties to customize the button.
 * @returns {JSX.Element} A button element with the specified properties.
 */
const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const {
    title,
    children,
    disabled,
    type,
    loading,
    className,
    icon,
    id,
    onKeyDown,
    onClick,
  } = props;
  return (
    <button
      id={id}
      className={ disabled ? "btn custom-btn" : loading ? "btn custom-btn btn-loading " + className : "btn custom-btn " + className}
      type={type}
      onKeyDown={onKeyDown}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <div className="btn-loader">
          <img src={Loader} alt="loader" height={20} width={20} />
        </div>
      ) : (
        <>
        {icon &&
          <i className={`icon icon-${icon}`} />
        }
        {title}
        </>
      )}
      {children}
    </button>
  );
};
CustomButton.defaultProps = {
  loading: false,
  className: "",
};

export default CustomButton;
