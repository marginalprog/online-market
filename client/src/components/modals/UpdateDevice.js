import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import {
  fetchBrands,
  fetchOneDevice,
  fetchTypes,
  updateDevice
} from "../../http/deviceApi";
import ModalError from "./ModalError";
import ModalInfo from "./ModalInfo";
import { v4 as uuidv4 } from "uuid";

const UpdateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);

  const [deviceId, setDeviceId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("Введите стоимость устройства");
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: uuidv4() }]);
  };

  const removeInfo = number => {
    setInfo(info.filter(item => item.number !== number));
  };

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
    setDeviceId("");
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

  const loadDevice = () => {
    if (!deviceId) {
      setErrorMessage("Пожалуйста, введите id устройства");
      setShowError(true);

      return;
    }

    setIsLoading(true);

    fetchOneDevice(deviceId)
      .then(data => {
        device.setSelectedType(
          device.types.find(type => type.id === data.typeId)
        );
        device.setSelectedBrand(
          device.brands.find(brand => brand.id === data.brandId)
        );
        setName(data.name);
        setPrice(data.price);

        const deviceInfo = (data.info || []).map(item => ({
          ...item,
          number: uuidv4() // Генерация уникального номера для каждого свойства
        }));

        setInfo(deviceInfo);
      })
      .catch(error => {
        if (error.message.includes("404")) {
          setErrorMessage(`Устройство с id=${deviceId} не найдено`);
          setShowError(true);

          return;
        } else if (error.message.includes("500")) {
          setErrorMessage(`Слишком большое значение id. Максимум 8 знаков`);
          setShowError(true);

          return;
        }
        setErrorMessage(error.message || "Ошибка загрузки устройства");
        setShowError(true);

        clearModal();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const patchDevice = () => {
    if (!name || !price) {
      setErrorMessage("Пожалуйста, введите название и цену");
      setShowError(true);

      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    if (file) formData.append("img", file);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append(
      "info",
      JSON.stringify(
        info.map(item => ({
          id: item.id || null,
          title: item.title,
          description: item.description,
          deviceId: deviceId
        }))
      )
    );

    // todo: хранить путь до изображения в бд
    //  и выводить картинку при редактировании
    updateDevice(deviceId, formData)
      .then(data => {
        setInfoMessage(`Девайс "${name}" успешно обновлен`);
        setShowInfo(true);

        clearModal();
      })
      .catch(error => {
        console.log(error);
        if (error.message.includes("400")) {
          setErrorMessage(
            `Слишком большая цена или название. Максимум 8 и 255 знаков`
          );
          setShowError(true);
        } else {
          setErrorMessage(
            error.response?.data?.message || "Ошибка обновления девайса"
          );
          setShowError(true);
        }
      });
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Обновить данные устройства</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={deviceId}
            onChange={event => setDeviceId(event.target.value)}
            className="mt-3"
            placeholder="Введите ID устройства"
          />
          <div className="d-flex justify-content-center mt-3 mb-2">
            <Button
              variant="outline-dark"
              onClick={loadDevice}
              disabled={isLoading}
            >
              Загрузить данные
            </Button>
          </div>
          <hr />
          {!isLoading && name && (
            <>
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
              <Form.Control
                className="mt-3"
                type="file"
                onChange={selectFile}
              />

              <hr />

              <div className="d-flex justify-content-center mt-2 mb-2">
                <Button variant={"outline-dark"} onClick={addInfo}>
                  Добавить свойство
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
                  <Col
                    xs={5}
                    md={5}
                    className="mt-1 d-flex justify-content-сenter"
                  >
                    <Form.Control
                      value={item.description}
                      onChange={event =>
                        changeInfo(
                          "description",
                          event.target.value,
                          item.number
                        )
                      }
                      style={{ marginLeft: "-12px" }}
                      placeholder={"Описание"}
                    />
                  </Col>
                  <Col
                    xs={2}
                    md={2}
                    className="mt-1 d-flex justify-content-center"
                  >
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
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Закрыть
        </Button>
        <Button variant="dark" onClick={patchDevice}>
          Обновить
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

export default UpdateDevice;
