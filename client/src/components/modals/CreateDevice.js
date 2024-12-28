import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import {
  createDevice,
  fetchBrands,
  fetchDevices,
  fetchTypes
} from "../../http/deviceApi";
import ModalError from "./ModalError";
import ModalInfo from "./ModalInfo";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  // поля формы
  const [name, setName] = useState("");
  const [price, setPrice] = useState("Введите стоимость устройства");
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
    fetchDevices().then(data => device.setDevices(data.rows));
  }, []);
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = number => {
    setInfo(info.filter(item => item.number !== number));
  };

  // если № совпал с № элемента итерации, тогда возвращаем новый объект с заменённым полем
  // если № не совпал - возвращаем объект неизменённым
  const changeInfo = (key, value, number) => {
    setInfo(
      info.map(item =>
        item.number === number ? { ...item, [key]: value } : item
      )
    );
  };

  const handleCloseError = () => setShowError(false);

  const handleCloseInfo = () => {
    onHide();
    setShowInfo(false);
  };

  const handleCloseModal = () => {
    clearModal();
    onHide();
  };

  const clearModal = () => {
    setName("");
    setPrice("");
    setInfo([]);
    device.setSelectedType(null);
    device.setSelectedBrand(null);
  };

  const selectFile = event => {
    setFile(event.target.files[0]);
    console.log(file);
  };

  const addDevice = () => {
    if (!name || !price || !file) {
      setErrorMessage("Пожалуйста, заполните все представленные поля");
      setShowError(true);

      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("img", file);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);

    formData.append("info", JSON.stringify(info));

    createDevice(formData)
      .then(data => {
        setInfoMessage(`Девайс "${name}" создан`);
        setShowInfo(true);
      })
      .catch(error => {
        console.log(error);
        if (error.message.includes("400")) {
          setErrorMessage(
            `Слишком большая цена или название. Максимум 8 и 255 знаков`
          );
          setShowError(true);
        } else {
          setErrorMessage(`${error.message}`);
          setShowError(true);
        }
      });
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новое устройство</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="d-flex justify-content-center">
            <Dropdown.Toggle variant={"outline-dark"}>
              {device.selectedType?.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => device.setSelectedType(type)}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="d-flex justify-content-center mt-2 mb-2">
            <Dropdown.Toggle variant={"outline-dark"}>
              {device.selectedBrand?.name || "Выберите бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            value={name}
            onChange={event => setName(event.target.value)}
            className="mt-3"
            placeholder={"Введите название устройства"}
            variant={"outline-dark"}
          />
          <Form.Control
            value={price}
            onChange={event => setPrice(Number(event.target.value))}
            className="mt-3"
            placeholder={"Введите стоимость устройства"}
            type="number"
            step="0.01"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />

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
              <Col xs={5} md={5} className="mt-1">
                <Form.Control
                  value={item.title}
                  onChange={event =>
                    changeInfo("title", event.target.value, item.number)
                  }
                  placeholder={"Название"}
                />
              </Col>
              <Col xs={5} md={5} className="mt-1 d-flex justify-content-сenter">
                <Form.Control
                  value={item.description}
                  onChange={event =>
                    changeInfo("description", event.target.value, item.number)
                  }
                  style={{ marginLeft: "-12px" }}
                  placeholder={"Описание"}
                />
              </Col>
              <Col xs={2} md={2} className="mt-1 d-flex justify-content-center">
                <Button
                  onClick={() => removeInfo(item.number)}
                  variant={"outline-danger"}
                  style={{ width: "150%", marginLeft: "-12px" }}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Закрыть
        </Button>
        <Button variant="dark" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>

      <ModalError
        show={showError}
        errorMessage={errorMessage}
        handleCloseError={handleCloseError}
      />
      <ModalInfo
        show={showInfo}
        infoMessage={infoMessage}
        handleCloseInfo={handleCloseInfo}
      />
    </Modal>
  );
});

export default CreateDevice;
