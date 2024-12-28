import React, { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import DeleteType from "../components/modals/DeleteType";
import DeleteBrand from "../components/modals/DeleteBrand";
import DeleteDevice from "../components/modals/DeleteDevice";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import UpdateBrand from "../components/modals/UpdateBrand";
import UpdateType from "../components/modals/UpdateType";
import UpdateDevice from "../components/modals/UpdateDevice";

const Admin = observer(() => {
  // const { device } = useContext(Context);
  // fixme: обновление полей бренда и типа при открытии форм
  const [modals, setModals] = useState({
    createType: false,
    createBrand: false,
    createDevice: false,
    updateType: false,
    updateBrand: false,
    updateDevice: false,
    deleteType: false,
    deleteBrand: false,
    deleteDevice: false
  });

  const toggleModal = modalKey => {
    setModals(prev => ({ ...prev, [modalKey]: !prev[modalKey] }));
  };

  return (
    <Container className="d-flex flex-wrap justify-content-center align-items-stretch gap-4 mt-4">
      {[
        {
          title: "Добавление",
          buttons: [
            {
              text: "Новый тип",
              action: () => toggleModal("createType"),
              icon: <FaPlus />
            },
            {
              text: "Новый бренд",
              action: () => toggleModal("createBrand"),
              icon: <FaPlus />
            },
            {
              text: "Новое устройство",
              action: () => toggleModal("createDevice"),
              icon: <FaPlus />
            }
          ]
        },
        {
          title: "Изменение",
          buttons: [
            {
              text: "Изменить название типа",
              action: () => toggleModal("updateType"),
              icon: <FaEdit />
            },
            {
              text: "Изменить название бренда",
              action: () => toggleModal("updateBrand"),
              icon: <FaEdit />
            },
            {
              text: "Изменить параметры устройства",
              action: () => toggleModal("updateDevice"),
              icon: <FaEdit />
            }
          ]
        },
        {
          title: "Удаление",
          buttons: [
            {
              text: "Удалить тип",
              action: () => toggleModal("deleteType"),
              icon: <FaTrash />
            },
            {
              text: "Удалить бренд",
              action: () => toggleModal("deleteBrand"),
              icon: <FaTrash />
            },
            {
              text: "Удалить устройство",
              action: () => toggleModal("deleteDevice"),
              icon: <FaTrash />
            }
          ]
        }
      ].map((block, idx) => (
        <Card key={idx} style={{ width: "350px" }} className="shadow-sm p-3">
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title className="mb-4">{block.title}</Card.Title>
            {block.buttons.map((btn, btnIdx) => (
              <Button
                key={btnIdx}
                variant="outline-dark"
                className="mt-2 w-100"
                onClick={btn.action}
              >
                {btn.icon}
                <span className="ms-2">{btn.text}</span>{" "}
              </Button>
            ))}
          </Card.Body>
        </Card>
      ))}
      <CreateType
        show={modals.createType}
        onHide={() => toggleModal("createType")}
      />{" "}
      <CreateBrand
        show={modals.createBrand}
        onHide={() => toggleModal("createBrand")}
      />{" "}
      <CreateDevice
        show={modals.createDevice}
        onHide={() => toggleModal("createDevice")}
      />
      <DeleteType
        show={modals.deleteType}
        onHide={() => toggleModal("deleteType")}
      />{" "}
      <DeleteBrand
        show={modals.deleteBrand}
        onHide={() => toggleModal("deleteBrand")}
      />{" "}
      <DeleteDevice
        show={modals.deleteDevice}
        onHide={() => toggleModal("deleteDevice")}
      />
      <UpdateType
        show={modals.updateType}
        onHide={() => toggleModal("updateType")}
      />{" "}
      <UpdateBrand
        show={modals.updateBrand}
        onHide={() => toggleModal("updateBrand")}
      />{" "}
      <UpdateDevice
        show={modals.updateDevice}
        onHide={() => toggleModal("updateDevice")}
      />
    </Container>
  );
});

export default Admin;
