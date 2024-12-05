import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const DeleteBrand = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Удалить бренд</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder={"Введите id бренда"} />
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

export default DeleteBrand;
