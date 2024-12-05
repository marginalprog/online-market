import React, { useContext, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../index";

const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [selectedType, setSelectedType] = useState("Выберите тип");
  const [selectedBrand, setSelectedBrand] = useState("Выберите бренд");

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = number => {
    setInfo(info.filter(item => item.number !== number));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={true}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Добавить новое устройство</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="d-flex justify-content-center mt-2 mb-2">
            <Dropdown.Toggle variant={"outline-dark"}>
              {selectedType}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => setSelectedType(type.name)}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="d-flex justify-content-center mt-2 mb-2">
            <Dropdown.Toggle variant={"outline-dark"}>
              {selectedBrand}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.name)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            className="mt-3"
            placeholder={"Введите название устройства"}
            variant={"outline-dark"}
          />
          <Form.Control
            className="mt-3"
            placeholder={"Введите стоимость устройства"}
            type="number"
          />
          <Form.Control className="mt-3" type="file" />
          <hr />
          <div className="d-flex justify-content-center mt-2 mb-2">
            <Button variant={"outline-dark"} onClick={addInfo}>
              Добавить новое свойство
            </Button>
          </div>
          {info.map(item => (
            <Row
              key={item.number}
              className="mt-2 d-flex justify-content-center align-items-center"
            >
              <Col md={4} className="mt-1">
                <Form.Control placeholder={"Название"} />
              </Col>
              <Col md={4} className="mt-1 d-flex justify-content-center ">
                <Form.Control placeholder={"Описание"} />
              </Col>
              <Col md={4} className="mt-1 d-flex justify-content-center">
                <Button
                  onClick={() => removeInfo(item.number)}
                  variant={"outline-danger"}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
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

export default CreateDevice;
