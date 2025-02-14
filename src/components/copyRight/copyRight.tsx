import React, { useEffect, useState } from "react";

/**
 * Functional component that displays the current year and updates it every hour.
 * @returns JSX element displaying the current year.
 */
const CopyRight: React.FC = (props) => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000 * 60 * 60); // Update every hour, adjust as needed

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once during mounting

  return (
    <span>{currentYear}</span>
  );
};

export default CopyRight;