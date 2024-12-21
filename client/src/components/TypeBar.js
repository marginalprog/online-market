import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, ListGroup } from "react-bootstrap";
import { Context } from "../index";

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  const clearSelectedType = () => {
    device.setSelectedType({});
  };

  const clearSelectedBrand = () => {
    device.setSelectedBrand({});
  };

  return (
    <Col>
      <div className="d-flex flex-column flex-lg-row flex-xl-row justify-content-center mb-3 mt-3 w-100 custom-button-container">
        <Button
          variant="light"
          className="custom-button mb-2 mb-lg-0 mb-xl-0 w-100"
          style={{
            border: "1px solid rgb(221, 221, 221)",
            fontSize: 14,
            whiteSpace: "nowrap",
            marginRight: "0.5rem"
          }}
          onClick={clearSelectedType}
        >
          Очистить тип
        </Button>
        <Button
          variant="light"
          className="custom-button w-100"
          style={{
            border: "1px solid rgb(221, 221, 221)",
            whiteSpace: "nowrap",
            fontSize: 14
          }}
          onClick={clearSelectedBrand}
        >
          Очистить бренд
        </Button>
      </div>

      <ListGroup className="mt-2 d-flex justify-content-center w-100">
        {device.types.map(type => (
          <ListGroup.Item
            variant="light"
            style={{ cursor: "pointer" }}
            active={type.id === device.selectedType.id}
            onClick={() => device.setSelectedType(type)}
            key={type.id}
            className="w-100"
          >
            {type.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
});

export default TypeBar;
