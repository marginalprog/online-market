import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Col, Row } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex">
      {device.brands.map(brand => (
        <Col
          key={brand.id}
          className="d-flex justify-content-center"
          xs={4}
          sm={4}
          md={4}
          lg={2}
        >
          <Card
            style={{
              cursor: "pointer ",
              minWidth: "100px",
              border: "1px solid #ddd",
              backgroundColor:
                brand.id === device.selectedBrand.id ? "#40484d" : "#fcfcfc",
              color: brand.id === device.selectedBrand.id ? "white" : "#373737"
            }}
            key={brand.id}
            className="p-2 ml-2 mt-3 text-center"
            onClick={() => device.setSelectedBrand(brand)}
          >
            {" "}
            {brand.name}{" "}
          </Card>
        </Col>
      ))}
    </Row>
  );
});

export default BrandBar;
