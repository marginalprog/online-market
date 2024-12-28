import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchOneBrand, updateBrand } from "../../http/deviceApi";
import ModalInfo from "./ModalInfo";
import ModalError from "./ModalError";

const UpdateBrand = ({ show, onHide }) => {
  const [brandId, setBrandId] = useState("");
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
    setBrandId("");
  };

  const loadBrand = () => {
    if (!brandId) {
      setErrorMessage("Пожалуйста, введите id бренда");
      setShowError(true);

      return;
    }

    setIsLoading(true);

    fetchOneBrand(brandId)
      .then(data => {
        console.log(data);
        setName(data.name);
      })
      .catch(error => {
        if (error.message.includes("404")) {
          setErrorMessage(`Тип с id=${brandId} не найден`);
          setShowError(true);

          return;
        }
        setErrorMessage(error.message || "Ошибка загрузки бренда");
        setShowError(true);

        clearModal();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const patchBrand = () => {
    if (!name) {
      setErrorMessage("Пожалуйста, введите название бренда");
      setShowError(true);

      return;
    }

    updateBrand(brandId, { name })
      .then(() => {
        setInfoMessage(`Тип с id=${brandId} успешно обновлён`);
        setShowInfo(true);

        clearModal();
      })
      .catch(error => {
        console.error(error);
        setErrorMessage(
          error.response?.data?.message || "Ошибка обновления бренда"
        );
        setShowError(true);
      });
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Изменить бренд</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder={"Введите id бренда"}
            value={brandId}
            onChange={event => setBrandId(event.target.value)}
            className="mt-2"
          />
          <div className="d-flex justify-content-center mt-3 mb-2">
            <Button variant="outline-dark" className="mt-2" onClick={loadBrand}>
              Загрузить данные
            </Button>
          </div>
          <hr />
          {!isLoading && name && (
            <>
              <Form.Control
                placeholder={"Введите название бренда"}
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
        <Button variant="dark" onClick={patchBrand}>
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

export default UpdateBrand;
