import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../store/features/toast/toastSlice";
import LogoWithText from "../assets/images/logoWithText.svg";
import useWindowDimension from "../components/hooks/useWindowDimension";
import Logo from "../assets/images/logo.svg";
import ProfileDropdown from "../components/profileDropdown/profileDropdown";
import ConfirmationModal from "../components/confirmationModal/confirmationModal";


/**
 * Functional component for the header section of the application.
 * @param {Object} props - The properties object containing toggleSidebar function and isSidebarOpen boolean.
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar.
 * @param {boolean} props.isSidebarOpen - Boolean indicating whether the sidebar is open or not.
 * @returns JSX element representing the header section with logo, sidebar toggle, and profile dropdown.
 */
function Header({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const [logoutModal, setLogoutModal] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dimension = useWindowDimension()

  const handleLogout = () => {
    setLogoutModal(true);
  };

  /**
   * Clears the localStorage, navigates to the "/sign" route, closes the logout modal,
   * and dispatches a success toast message indicating successful logout.
   * @returns None
   */
  const onPressConfirm = async () => {
    localStorage.clear()
    navigate("/sign");
    setLogoutModal(false);
    dispatch(
      showToast({
        message: t("YOU_HAVE_LOGGED_OUT_SUCCESSFULLY"),
        type: "success",
      })
    );
    // setTimeout(() => {
    //   navigate("/sign");
    // }, 3000);
  };

  const onPressCancel = () => {
    setLogoutModal(false);
  };

  return (
    <>
      <header className="navbar fixed-top">
        <div className="d-flex align-items-center">
          <img src={(dimension?.width < 769) ? Logo : LogoWithText} title="Logo" alt="Logo" />
          <span
            onClick={toggleSidebar}
            className={
              isSidebarOpen ? "toggle sidebarOpen" : "toggle sidebarClose"
            }
          >
            <i className="icon icon-toggle"></i>
          </span>
        </div>
        <div className="d-flex ">
          <ProfileDropdown profileAvtar={'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} handleLogout={handleLogout} />
        </div>
      </header>

      <ConfirmationModal
        showModal={logoutModal}
        onHide={() => {
          setLogoutModal(false);
        }}
        modalIconName="logout"
        modalTitle={t("LOGOUT")}
        modalContent={t("ARE_YOU_SURE_LOGOUT")}
        modalLeftButtonTitle={t("CONFIRM")}
        modalRightButtonTitle={t("CANCEL")}
        modalLeftButtonClick={() => {
          onPressConfirm();
        }}
        modalRightButtonClick={onPressCancel}
      />
    </>
  );
}

export default Header;
