import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Scrollbar } from 'react-scrollbars-custom';
import useWindowDimension from "../components/hooks/useWindowDimension";
import CopyRight from "../components/copyRight/copyRight";
import Constant from "../utils/constant";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

/**
 * Sidebar component that displays navigation links based on user role.
 * @param {boolean} isOpen - Flag to indicate if the sidebar is open or closed.
 * @param {function} toggleSidebar - Function to toggle the sidebar open/close state.
 * @returns {JSX.Element} Sidebar component with navigation links and user role specific content.
 */
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const dimensions = useWindowDimension();
  const userRole = window.localStorage.getItem(Constant.LOCALSTORAGEKEYS.USER_ROLE)


  const { t } = useTranslation();
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  /**
   * useEffect hook that sets the height of the header element with the class "navbar" 
   * as the state variable headerHeight.
   * @returns None
   */
  useEffect(() => {
    const headerElement = document.getElementsByClassName("navbar")[0] as HTMLElement;
    const height = headerElement.clientHeight;
    setHeaderHeight(height);
  }, []);


  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`} style={{ paddingTop: headerHeight }}>
      <Scrollbar
        trackYProps={{ style: { width: 4 } }}
        disableTrackYWidthCompensation
        style={{ height: dimensions.height - headerHeight }} removeTracksWhenNotUsed={true}
      >
        {userRole === 'Staff' ?
          <nav className="sidebarScroll">
            <p>{t("MANAGEMENT")}</p>
            <NavLink
              to="/program"
              className={({ isActive }) => (isActive ? "active hide" : "inactive hide")}
            >
              <i className="icon icon-star_border" />
              <span>{t("PROGRAMS")}</span>
            </NavLink>
            <NavLink
              to="/organisations"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <i className="icon icon-city" />
              <span>{t("ORGANISATIONS")}</span>
            </NavLink>
            <NavLink
              to="/donors"
              className={({ isActive }) => (isActive ? "active hide" : "inactive hide")}
            >
              <i className="icon icon-donor" />
              <span>{t("DONOR")}</span>
            </NavLink>
            <NavLink
              to="/causemanagement"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <i className="icon icon-earth" />
              <span>{t("CAUSE")}</span>
            </NavLink>
            <NavLink
              to="/categorymanagement"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <i className="icon icon-shapes" />
              <span>{t("CATEGORY")}</span>
            </NavLink>
            <p>{t("OTHERS")}</p>
            <NavLink
              to="/notifications"
              className={({ isActive }) => (isActive ? "active hide" : "inactive hide")}
            >
              <i className="icon icon-notification" />
              <span>{t("NOTIFICATIONS")}</span>
              <div className="notificationCount">2</div>
            </NavLink>
          </nav>
          : <nav className="sidebarScroll">
            <p>{t("REPORTS")}</p>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active hide"  : "inactive hide")}
            >
              <i className="icon icon-home" />
              <span>{t("DASHBOARD")}</span>
            </NavLink>
            <p>{t("MANAGEMENT")}</p>
            <NavLink
              to="/program"
              className={({ isActive }) => (isActive ? "active hide" : "inactive hide")}
            >
              <i className="icon icon-star_border" />
              <span>{t("PROGRAMS")}</span>
            </NavLink>
            <NavLink
              to="/finance"
              className={({ isActive }) => (isActive ? "active hide" : "inactive hide")}
            >
              <i className="icon icon-wallet" />
              <span>{t("FINANCE")}</span>
            </NavLink>
            <NavLink
              to="/organisations"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <i className="icon icon-city" />
              <span>{t("ORGANISATIONS")}</span>
            </NavLink>
            <NavLink
              to="/donors"
              className={({ isActive }) => (isActive ? "active hide" : "inactive hide")}
            >
              <i className="icon icon-donor" />
              <span>{t("DONOR")}</span>
            </NavLink>
            <NavLink
              to="/causemanagement"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <i className="icon icon-earth" />
              <span>{t("CAUSE")}</span>
            </NavLink>
            <NavLink
              to="/categorymanagement"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <i className="icon icon-shapes" />
              <span>{t("CATEGORY")}</span>
            </NavLink>
            <NavLink
              to="/supportstaff"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <i className="icon icon-users" />
              <span>{t("SUPPORT_STAFF")}</span>
            </NavLink>
            <p>{t("OTHERS")}</p>
            <NavLink
              to="/notifications"
              className={({ isActive }) => (isActive ? "active hide" : "inactive hide")}
            >
              <i className="icon icon-notification" />
              <span>{t("NOTIFICATIONS")}</span>
              <div className="notificationCount">2</div>
            </NavLink>
          </nav>
        }


      </Scrollbar>
      <p className="copyRight">
        <span className="copyRightWrapper">
          © <CopyRight /> {t("COPYRIGHTSTEXT")}
        </span>
      </p>
    </div>
  );
};

export default Sidebar;
