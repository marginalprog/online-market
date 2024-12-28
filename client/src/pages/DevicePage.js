import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Context } from "../index";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceApi";
import star from "../assets/star.png";
import { pluralize } from "numeralize-ru";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  const reviewsText = pluralize(device.reviews, "отзыв", "отзыва", "отзывов");

  useEffect(() => {
    fetchOneDevice(id).then(data => {
      setDevice(data);
    });
  }, []);

  const { cart } = useContext(Context);
  const handleAddToCart = () => {
    cart.addToCart(device);
  };

  return (
    <Container className="mt-3">
      <Row>
        {/* изображение товара */}
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={4}
          className="d-flex align-items-center justify-content-center"
        >
          <Image
            width={260}
            height={260}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>

        {/* название товара */}
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={4}
          className="d-flex align-items-center justify-content-center mt-3"
        >
          <Row
            className="d-flex flex-column align-items-center text-center p-3"
            style={{
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            <h2 style={{ color: "#333", marginBottom: "10px" }}>
              {device.name}
            </h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ fontSize: "16px" }}
            >
              <Image
                src={star}
                width={20}
                height={20}
                style={{ marginRight: "5px" }}
              />
              <div className="text-black-50">
                {device.rating % 1 === 0
                  ? Math.round(device.rating)
                  : device.rating}
                <span
                  style={{ color: "#999", fontSize: "16px", marginLeft: "5px" }}
                >
                  • {device.reviews} {reviewsText}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <Button
                variant="outline-dark"
                style={{ fontSize: 16 }}
                // onClick={}
              >
                Оставить отзыв
              </Button>
            </div>
          </Row>
        </Col>

        {/* адаптивная форма с ценой №1 */}
        <Col
          xs={12}
          sm={12}
          md={4}
          lg={4}
          className="d-flex flex-column align-items-center justify-content-center d-md-none mt-3"
        >
          <Card
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
              width: 250,
              height: 180,
              padding: 20,
              borderRadius: 10,
              border: "0px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
              position: "relative"
            }}
          >
            <h5
              style={{ color: "#333", marginBottom: 10, textAlign: "center" }}
            >
              От: {device.price} руб.
            </h5>
            <Button
              variant="dark"
              style={{ fontSize: 16 }}
              onClick={handleAddToCart}
            >
              Добавить в корзину
            </Button>
            <span
              style={{
                fontSize: "12px",
                position: "absolute",
                bottom: 10
              }}
            >
              Доставим <span style={{ fontWeight: "bold" }}>завтра</span>
            </span>
          </Card>
        </Col>
        {/* адаптивная форма с ценой №2 */}
        <Col xs={4} sm={4} md={4} lg={4} className="d-none d-md-flex">
          <Card
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
              width: 250,
              padding: 20,
              borderRadius: 10,
              border: "0px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
              position: "relative"
            }}
          >
            <h5
              style={{ color: "#333", marginBottom: 10, textAlign: "center" }}
            >
              От: {device.price} руб.
            </h5>
            <Button
              variant="dark"
              style={{ fontSize: 16 }}
              onClick={handleAddToCart}
            >
              Добавить в корзину
            </Button>
            <span
              style={{
                fontSize: "12px",
                position: "absolute",
                bottom: 10
              }}
            >
              Доставим <span style={{ fontWeight: "bold" }}>завтра</span>
            </span>
          </Card>
        </Col>
      </Row>

      {/* характеристики */}
      <Row lg={12} className="d-flex flex-column mt-2">
        <div>
          <Col className="mb-4">
            <h3 style={{ color: "#333", textAlign: "center" }}>
              Характеристики
            </h3>
          </Col>
          {device.info.map((info, index) => (
            <Card
              key={info.id}
              className="mb-2 p-1 shadow-sm"
              style={{ borderRadius: "10px", border: "1px solid #e0e0e0" }}
            >
              <Card.Body className="d-flex justify-content-between">
                <Card.Title
                  className="mb-0"
                  style={{
                    fontSize: "16px",
                    color: "#555"
                  }}
                >
                  {info.title}
                </Card.Title>
                <Card.Text
                  className="mb-0"
                  style={{
                    fontSize: "16px",
                    color: "#777"
                  }}
                >
                  {info.description}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default DevicePage;
