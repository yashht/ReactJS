import React, { forwardRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ProfileDropdownProps {
  profileAvtar: string,
  handleLogout: () => void;
}

/**
 * ProfileDropdown component displays a dropdown menu for user profile options.
 * @param {ProfileDropdownProps} props - The properties passed to the component.
 * @returns {JSX.Element} A dropdown menu with profile options like edit profile, change password, and logout.
 */
const ProfileDropdown: React.FC<ProfileDropdownProps> = (props) => {
  const { t } = useTranslation();
  const { handleLogout, profileAvtar } = props;
  const [name] = useState<string>("Leslie Alexander");
  const hasProfileAvtar = profileAvtar && profileAvtar.length > 0;
  const shortName = name ? name.split(' ').map(word => word.charAt(0).toUpperCase()).join('') : '';

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown">
        {hasProfileAvtar ? (
        <img className="img-responsive" src={profileAvtar} alt="Profile Avatar" />
      ) : (
        <span className="shortName">{shortName}</span>
      )}

        <p>{name}</p>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/editprofile" className="topbarHide">
          <i className="icon icon-user"></i> {t("EDIT_PROFILE")}
        </Dropdown.Item>
        <Dropdown.Item href="/changepassword" className="topbarHide">
          <i className="icon icon-key"></i> {t("CHANGE_PASSWORD")}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>
          <i className="icon icon-logout"></i>
          {t("LOGOUT")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

/**
 * CustomToggle component that forwards a ref to an HTMLAnchorElement and accepts children and onClick function as props.
 * @param {Object} props - The props object containing children and onClick function.
 * @param {React.ReactNode} props.children - The child elements to render within the CustomToggle component.
 * @param {(e: React.MouseEvent) => void} props.onClick - The function to be called when the CustomToggle is clicked.
 * @param {React.Ref<HTMLAnchorElement>} ref - The ref object to forward to the HTMLAnchorElement.
 * @returns JSX element representing the CustomToggle component.
 */
const CustomToggle = forwardRef<
  HTMLAnchorElement,
  { children: React.ReactNode; onClick: (e: React.MouseEvent) => void }
>(({ children, onClick }, ref) => (
  <span
    className="d-flex align-items-center justify-content-center"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <i className="icon icon-arrow_bottom" />
  </span>
));

export default ProfileDropdown;
