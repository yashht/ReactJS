import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "react-bootstrap";
import { hideToast } from "../../store/features/toast/toastSlice";

interface ToastType {
  type: "success" | "error" | "info";
  show: boolean;
  customClass?: string;
  message?: string;
}

/**
 * Functional component for displaying toast messages in a React application.
 * @returns JSX element for displaying toast messages with different types (success, error, info).
 */
const ToastComponent: React.FC = () => {
  const toast: ToastType = useSelector((state: any) => state.toast);
  const [showToast, setShowToast] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowToast(toast.show);
  }, [toast.show]);

  let toastClass: string | undefined;
  let iconClass: string | undefined = toast.customClass;

  if (toast.type === "success") {
    toastClass = "success";
    iconClass = "done_all";
  } else if (toast.type === "error") {
    toastClass = "error";
    iconClass = "error";
  } else if (toast.type === "info") {
    toastClass = "info";
    iconClass = "info";
  }

  return (
    <Toast
      onClose={() => {
        setShowToast(false);
        setTimeout(() => {
          dispatch(hideToast());
        }, 1000);
      }}
      className={toastClass}
      show={showToast}
      delay={3000}
      autohide
      animation={false}
    >
      <div className="tost-center">
        <i className={`icon icon-${iconClass}`}></i>
        {toast.message && (
          <div
            className="txtcontain"
            dangerouslySetInnerHTML={{ __html: toast.message }}
          />
        )}
      </div>
    </Toast>
  );
};

export default ToastComponent;
