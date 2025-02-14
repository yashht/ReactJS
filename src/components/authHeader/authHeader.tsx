import React from "react";
import Logo from "../../assets/images/logo.svg";

interface AuthHeaderProps {
  headerTitle: string;
  headerSubText?: string;
  headerDescription?: string;
  headerLogo: React.ReactNode;
}

/**
 * Functional component for rendering an authentication header.
 * @param {AuthHeaderProps} props - The props containing headerTitle, headerSubText, headerLogo, and headerDescription.
 * @returns JSX element representing the authentication header.
 */
const AuthHeader: React.FC<AuthHeaderProps> = (props) => {
  const { headerTitle, headerSubText, headerLogo, headerDescription } = props;

  return (
    <>
      <div className="authHeaderBack">
        <div>
          <h1>{headerTitle}</h1>
          <p>{headerSubText}</p>
        </div>
        {headerLogo}
        <div className="logoBack">
          <img src={Logo} title="logo" alt="logo" />
        </div>
      </div>
      {headerDescription && (
        <span className="headerDescription">{headerDescription}</span>
      )}
    </>
  );
};

export default AuthHeader;
