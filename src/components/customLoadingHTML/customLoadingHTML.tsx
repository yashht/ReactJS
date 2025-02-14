/**
 * Import the React library and the Loader image from the specified path.
 * @module
 * @requires React
 * @requires ../../assets/images/giphy.gif
 */
import React from "react";

const CustomLoadingHTML = () => {
  return (
    <>
      <div className="infinate-load">
        <div className="spinner-border" role="status"></div>
      </div>
    </>
  );
};

export default CustomLoadingHTML;
