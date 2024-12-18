import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../http/deviceApi";
import ModalError from "./ModalError";

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseError = () => setShowError(false);

  const addType = () => {
    if (!value) {
      setErrorMessage("Пожалуйста, заполните название типа");
      setShowError(true);

      return;
    }
    createType({ name: value }).then(data => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новый тип</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={type => setValue(type.target.value)}
            placeholder={"Введите название типа"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="dark" onClick={addType}>
          Добавить
        </Button>
      </Modal.Footer>

      <ModalError
        show={showError}
        errorMessage={errorMessage}
        handleCloseError={handleCloseError}
      />
    </Modal>
  );
};

export default CreateType;
