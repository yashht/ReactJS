import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

interface LayoutProps {}

/**
 * Functional component that represents the layout of the application.
 * @param {LayoutProps} props - The properties passed to the Layout component.
 * @returns JSX element representing the layout of the application.
 */
function Layout(props: LayoutProps) {
  // const [isSidebarOpen, setSidebarOpen] = useState(true);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!isSidebarOpen);
  // };

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  /**
   * A useEffect hook that listens for window resize events and toggles the sidebar state
   * based on the window width.
   * @returns None
   */
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1365) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    /**
     * Adds an event listener to the window resize event to handle resizing.
     * Calls the handleResize function when the window is resized.
     * @returns None
     */
    handleResize();
    window.addEventListener("resize", handleResize);

    /**
     * Removes the event listener for the "resize" event on the window.
     * @returns None
     */
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="wrapper">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Layout;
