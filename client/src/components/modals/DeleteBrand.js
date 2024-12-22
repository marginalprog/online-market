import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { deleteBrand } from "../../http/deviceApi";
import ModalError from "./ModalError";
import ModalInfo from "./ModalInfo";

const DeleteBrand = ({ show, onHide }) => {
  const [id, setId] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const handleCloseError = () => setShowError(false);
  const handleCloseInfo = () => {
    onHide();
    setShowInfo(false);
  };

  const dropBrand = () => {
    try {
      if (!id) {
        setErrorMessage("Пожалуйста, введите id бренда");
        setShowError(true);

        return;
      }
      deleteBrand(id)
        .then(() => {
          setId("");
          setInfoMessage(`Бренд с id=${id} удалён`);
          setShowInfo(true);
        })
        .catch(error => {
          console.log(error);
          if (error.message.includes("404")) {
            // или статус?
            setErrorMessage(`Бренд с id ${id} не найден `);
            setShowError(true);
          } else {
            setErrorMessage(`${error.message}`);
            setShowError(true);
          }
        });
    } catch (error) {
      setErrorMessage(`${error.message}`);
      setShowError(true);
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить бренд</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder={"Введите id бренда"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="danger" onClick={() => dropBrand()}>
          Удалить
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

export default DeleteBrand;
