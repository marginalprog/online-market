import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchOneType, updateType } from "../../http/deviceApi";
import ModalInfo from "./ModalInfo";
import ModalError from "./ModalError";

const UpdateType = ({ show, onHide }) => {
  const [typeId, setTypeId] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
    setTypeId("");
  };

  const loadType = () => {
    if (!typeId) {
      setErrorMessage("Пожалуйста, введите id типа");
      setShowError(true);

      return;
    }

    setIsLoading(true);

    fetchOneType(typeId)
      .then(data => {
        console.log(data);
        setName(data.name);
      })
      .catch(error => {
        if (error.message.includes("404")) {
          setErrorMessage(`Тип с id=${typeId} не найден`);
          setShowError(true);

          return;
        }
        setErrorMessage(error.message || "Ошибка загрузки типа");
        setShowError(true);

        clearModal();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const patchType = () => {
    if (!name) {
      setErrorMessage("Пожалуйста, введите название типа");
      setShowError(true);

      return;
    }

    updateType(typeId, { name })
      .then(() => {
        setInfoMessage(`Тип с id=${typeId} успешно обновлён`);
        setShowInfo(true);

        clearModal();
      })
      .catch(error => {
        console.error(error);
        setErrorMessage(
          error.response?.data?.message || "Ошибка обновления типа"
        );
        setShowError(true);
      });
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Изменить тип</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder={"Введите id типа"}
            value={typeId}
            onChange={event => setTypeId(event.target.value)}
            className="mt-2"
          />
          <div className="d-flex justify-content-center mt-3 mb-2">
            <Button variant="outline-dark" className="mt-2" onClick={loadType}>
              Загрузить данные
            </Button>
          </div>
          <hr />
          {!isLoading && name && (
            <>
              <Form.Control
                placeholder={"Введите название типа"}
                value={name}
                onChange={event => setName(event.target.value)}
                className="mt-2"
              />
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Закрыть
        </Button>
        <Button variant="dark" onClick={patchType}>
          Сохранить
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
};

export default UpdateType;
