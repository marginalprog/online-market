import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
  const history = useNavigate();

  console.log(history);

  return (
    <Col
      xs={6}
      sm={6}
      md={4}
      lg={3}
      className="mt-3 mb-1 d-flex justify-content-center"
      onClick={() => history(DEVICE_ROUTE + "/" + device.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image width={150} height={150} src={device.image} />
        <div className="mt-1 d-flex justify-content-between align-items-center">
          <div className="text-black-50">Apple</div>
          <div className="d-flex align-items-center">
            <div style={{ marginRight: "3px", marginBottom: "2px" }}>
              {device.rating}
            </div>
            <Image src={star} width={15} height={15} className="mb-1" />
          </div>
        </div>

        <div>{device.name}</div>
        <div>{device.price} руб.</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
