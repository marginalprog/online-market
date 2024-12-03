import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";

const DevicePage = () => {
  const device = {
    id: 1,
    name: "IPhone 12 Pro",
    price: 85000,
    rating: 5,
    reviews: 0,
    img:
      "https://m.media-amazon.com/images/I/61DreMaVplL._AC_UF1000,1000_QL80_.jpg"
  };

  const description = [
    {
      id: 1,
      title: "Оперативная память",
      description: "5 GB"
    },
    {
      id: 2,
      title: "Камера",
      description: "12 MP"
    },
    {
      id: 3,
      title: "Процессор",
      description: "Apple M1"
    },
    {
      id: 4,
      title: "Ядра процессора",
      description: "4"
    },
    {
      id: 5,
      title: "Аккумулятор",
      description: "4000 мАч"
    }
  ];

  return (
    <Container className="mt-3">
      <Row>
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={4}
          className="d-flex align-items-center justify-content-center"
        >
          <Image width={200} height={260} src={device.img} />
        </Col>
        <Col
          xs={12}
          sm={4}
          md={4}
          lg={4}
          className="d-flex align-items-center justify-content-center"
        >
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 200,
                height: 200,
                backgroundSize: "cover",
                fontSize: 64
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={4}
          lg={4}
          className="d-flex flex-column align-items-center justify-content-center d-md-none mt-3"
        >
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "3px solid lightgray",
              backgroundColor: "white"
            }}
          >
            <h3>От: {device.price} руб.</h3>
            <Button variant={"outline-dark"}>Добавить в корзину</Button>
          </Card>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} className="d-none d-md-flex">
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "3px solid lightgray",
              backgroundColor: "white"
            }}
          >
            <h3>От: {device.price} руб.</h3>
            <Button variant={"outline-dark"}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>

      <Row lg={12} className="d-flex flex-column mt-2">
        <div>
          <h1>Характеристики</h1>
          {description.map((info, index) => (
            <Row
              key={info.id}
              style={{
                background: index % 2 === 0 ? "lightgray" : "transparent",
                padding: 5
              }}
              className="mt-1"
            >
              {info.title}: {info.description}
            </Row>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default DevicePage;
