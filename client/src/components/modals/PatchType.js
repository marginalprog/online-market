import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const PatchType = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Изменить тип</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder={"Введите id типа"} />
          <Form.Control
            placeholder={"Введите название типа"}
            className={"mt-2"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="dark">Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatchType;
