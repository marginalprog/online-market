import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalError = ({ show, errorMessage, handleCloseError }) => {
  return (
    <Modal show={show} onHide={handleCloseError} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title>Ошибка</Modal.Title>
      </Modal.Header>
      <Modal.Body>{errorMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseError}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
