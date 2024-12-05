import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const PatchDevice = ({ show, onHide }) => {
  // const [deviceId, setDeviceId] = useState("");
  // const [deviceData, setDeviceData] = useState(null);
  // const [selectedType, setSelectedType] = useState("");
  // const [selectedBrand, setSelectedBrand] = useState("");
  // const [info, setInfo] = useState([]);
  //
  // const handleFetchDevice = async () => {
  //   const data = await fetchDeviceData(deviceId);
  //   if (data) {
  //     setDeviceData(data);
  //     setSelectedType(data.type);
  //     setSelectedBrand(data.brand);
  //     setInfo(data.info || []);
  //   } else {
  //     alert("Девайс не найден!");
  //   }
  // };

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Изменить девайс</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder={"Введите id девайса"} />
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

export default PatchDevice;
