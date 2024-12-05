import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CreateBrand = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Добавить новый бренд</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder={"Введите название бренда"} />
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

export default CreateBrand;
