import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalInfo = ({ show, infoMessage, handleCloseInfo }) => {
  return (
    <Modal show={show} onHide={handleCloseInfo} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title>Информация</Modal.Title>
      </Modal.Header>
      <Modal.Body>{infoMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseInfo}>
          Ок
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfo;
