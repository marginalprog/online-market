import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const DeleteDevice = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить девайс</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder={"Введите id девайса"} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="danger">Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteDevice;
