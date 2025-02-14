import { useEffect, useState } from "react";

type WindowDimensions = {
  height: number;
  width: number;
};

/**
 * A custom React hook that returns the dimensions of the window.
 * @returns {WindowDimensions} An object containing the height and width of the window.
 */
export default function useWindowDimension() {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  /**
   * A React hook that listens for window resize events and updates the dimensions state accordingly.
   * @returns None
   */
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    /**
     * Adds an event listener for the window resize event and removes it when the component unmounts.
     * @param {Event} handleResize - The event handler function for the resize event.
     * @returns A cleanup function that removes the event listener.
     */
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimensions;
}
