import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../customButton/customButton";

interface ConfirmationModalProps {
  className?: string;
  onHide: () => void;
  showModal: boolean;
  modalIconName?: string;
  modalIconBack?: string;
  modalTitle?: string;
  modalContent?: string;
  children?: React.ReactNode;
  modalLeftButtonTitle?: string;
  modalRightButtonTitle?: string;
  modalLeftButtonClick?: VoidFunction;
  modalRightButtonClick?: VoidFunction;
  isSingleButton?: boolean,
  onPressModalButton?: VoidFunction,
  modalButtonText?: string,
  selectedItem?: any;
  leftButtonLoader?: boolean
}

/**
 * Functional component for a Confirmation Modal with customizable props.
 * @param {ConfirmationModalProps} props - The props for the Confirmation Modal component.
 * @returns JSX element representing the Confirmation Modal.
 */
const ConfirmationModal: FC<ConfirmationModalProps> = (props) => {
  const {
    className,
    onHide,
    modalIconName,
    modalIconBack,
    modalTitle,
    modalContent,
    modalLeftButtonTitle,
    modalRightButtonTitle,
    modalLeftButtonClick,
    modalRightButtonClick,
    isSingleButton,
    onPressModalButton,
    modalButtonText,
    selectedItem,
    leftButtonLoader
  } = props;

  return (
    <Modal
      className={"confirm-modal " + className}
      show={props.showModal}
      onHide={onHide}
      centered
    >
      <Modal.Body>
        {modalIconName && (
          <div className={"modal-icon-back" + modalIconBack}>
            <i className={"icon icon-" + modalIconName} />
          </div>
        )}
        {modalTitle && <h4>{modalTitle}</h4>}
        {modalContent && (
          <p dangerouslySetInnerHTML={{ __html: modalContent }}>{}</p>
        )}
        {props?.children}
      </Modal.Body>
      <div className="d-flex btnInline">
        {isSingleButton ? 
          <CustomButton
            type="button"
            className="btn"
            onClick={onPressModalButton}
            title={modalButtonText}
          />
        :
        <>
          <CustomButton
            type="button"
            title={modalLeftButtonTitle}
            className="leftButton"
            onClick={modalLeftButtonClick}
            loading={leftButtonLoader}
          />
          <CustomButton
            type="button"
            title={modalRightButtonTitle}
            className="rightButton"
            onClick={modalRightButtonClick}
          />
        </>
      }
      </div>
    </Modal>
  );
};

/**
 * Default props for the ConfirmationModal component.
 * @type {object}
 * @property {string} className - The CSS class name for the modal.
 * @property {string} modalIconBack - The background icon for the modal.
 * @property {string} modalIconName - The icon name for the modal.
 */
ConfirmationModal.defaultProps = {
  className: "",
  modalIconBack: "",
  modalIconName: "",
};

export default ConfirmationModal;
