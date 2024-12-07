import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreateType = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новый тип</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder={"Введите название типа"} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="dark">Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
