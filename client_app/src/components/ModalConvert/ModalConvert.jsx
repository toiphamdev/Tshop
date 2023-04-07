import React from "react";
import { Modal } from "react-bootstrap";

const ModalConvert = ({ title, size, children, ...props }) => {
  return (
    <Modal
      {...props}
      size={size ? size : "lg"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalConvert;
