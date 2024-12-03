import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = () => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex mt-2">
      {device.devices.map(device => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </Row>
  );
};

export default DeviceList;