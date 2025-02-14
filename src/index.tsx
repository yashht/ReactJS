import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/theme.css";

/**
 * Creates a root for a React concurrent mode tree and attaches it to a specified DOM element.
 * @param {HTMLElement} element - The DOM element to attach the root to.
 * @returns The created root for the React concurrent mode tree.
 */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <React.Fragment>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Fragment>
    {/* </PersistGate> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
