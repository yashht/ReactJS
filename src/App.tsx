import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./routes";
import Layout from "./layout";
import ToastComponent from "./components/toastComponent/toastComponent";
// import Constant from "./utils/constant";

/**
 * Functional component representing the main App.
 * Utilizes React's useEffect hook to perform side effects.
 * Renders a ToastComponent and routes based on public and auth protected routes.
 * @returns JSX element representing the main App component.
 */
function App() {
  // const navigate = useNavigate();

  useEffect(() => {
    
    // if (!window.localStorage.getItem(Constant.LOCALSTORAGEKEYS.ACCESSTOKEN)) {
    //   navigate('/sign');
    //   }
  }, []);



  return (
    <React.Fragment>
      <ToastComponent />
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
        {authProtectedRoutes.map((route, idx) => (
          <Route key={idx} element={<Layout />}>
            <Route path={route.path} element={route.element} />
          </Route>
        ))}
      </Routes>
    </React.Fragment>
  );
}

export default App;
