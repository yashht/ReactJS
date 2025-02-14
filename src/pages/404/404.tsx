import React from "react";
import { useTranslation } from "react-i18next";
import useWindowDimension from "../../components/hooks/useWindowDimension";
import "./404.css";

/**
 * Functional component for rendering a 404 error page.
 * @param {object} props - The props passed to the component.
 * @returns JSX element representing the 404 error page.
 */
const Pages404: React.FC = (props) => {
  const { t } = useTranslation();
  const dimensions = useWindowDimension();
  return (
    <React.Fragment>
      <div className="nofoundPage" style={{ height: dimensions.height }}>
        <h1 className="text-center text-notfound"> {t("OOPS")}</h1>
        <p className="text-center"> {t("NO_SIGNAL_HERE")}</p>
      </div>
    </React.Fragment>
  );
};

export default Pages404;
