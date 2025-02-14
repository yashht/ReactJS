import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import Logo from "../../assets/images/logoWithText.svg";
interface CustomModalProps {
  modalTitle: string;
  closeModelIcon: () => void;
  onHide: () => void;
  className?: string;
  showModal: boolean;
  logoShow?: boolean;
  children?: React.ReactNode;
}

/**
 * CustomModal component that displays a modal with custom styling and functionality.
 * @param {CustomModalProps} props - The props object containing showModal, modalTitle, closeModelIcon, onHide, children, and className.
 * @returns JSX element representing the CustomModal component.
 */
const CustomModal: FC<CustomModalProps> = (props) => {
  const { 
    showModal,
    modalTitle,
    closeModelIcon,
    onHide,
    children, 
    className,
    logoShow = false 
  } =
    props;
  return (
    <Modal
      className={"custom-modal " + className}
      show={showModal}
      // onHide={onHide}
      centered
    >
      <Modal.Body>
        <div className="title-icon-wrapper">
          <div>
            { logoShow && <img className="modalLogo" src={Logo} alt="" />}
            <h4>{modalTitle}</h4>
          </div>
          <div className="close-icon" onClick={closeModelIcon}>
            <i className="icon icon-close"></i>
          </div>
        </div>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
