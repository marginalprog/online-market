import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createBrand } from "../../http/deviceApi";
import ModalError from "./ModalError";

const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseError = () => setShowError(false);

  const addBrand = () => {
    if (!value) {
      setErrorMessage("Пожалуйста, заполните название бренда");
      setShowError(true);

      return;
    }

    createBrand({ name: value }).then(data => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новый бренд</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={brand => setValue(brand.target.value)}
            placeholder={"Введите название бренда"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="dark" onClick={addBrand}>
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

export default CreateBrand;
