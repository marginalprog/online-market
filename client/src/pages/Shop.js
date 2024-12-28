import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceApi";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { device } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
    fetchDevices(null, null, 1, device.limit)
      .then(data => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000);
      });
  }, []);

  useEffect(() => {
    // setLoading(true);
    fetchDevices(
      device.selectedType?.id,
      device.selectedBrand?.id,
      device.page,
      device.limit
    ).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  if (loading) {
    return (
      <div className="jewish-loader-container">
        <div className="jewish-loader"></div>
      </div>
    );
  }

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
