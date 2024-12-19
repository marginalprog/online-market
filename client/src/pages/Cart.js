import React, { useContext } from "react";
import { Context } from "../index";
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import { FaTimes } from "react-icons/fa";

const Cart = observer(() => {
  const navigate = useNavigate();
  const { cart } = useContext(Context);

  if (cart.items.length === 0) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="d-flex flex-column align-items-center mt-2">
          <h2>Корзина пуста :-(</h2>
          <hr />
          <Button
            variant="dark"
            onClick={() => navigate(SHOP_ROUTE)}
            className="mt-2"
            style={{ minWidth: "60%", minHeight: "40px", fontSize: 18 }}
          >
            К покупкам!
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-start align-items-center"
      style={{ height: "100vh" }}
    >
      {/* Заголовок */}
      <Row className="w-100">
        <Col className="text-center my-4">
          <h2>Корзина</h2>
        </Col>
      </Row>

      {/* Основной контент */}
      <Row className="w-100 justify-content-center align-items-start">
        {/* Список товаров */}
        <Col
          md={7}
          className="d-flex flex-column align-items-center"
          style={{
            marginRight: "30px" // Отступ справа
          }}
        >
          <ListGroup style={{ width: "100%" }}>
            {cart.items.map(item => (
              <ListGroup.Item
                key={item.id}
                className="d-flex align-items-center"
                style={{
                  border: "0px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  padding: "15px",
                  marginBottom: "10px",
                  overflow: "hidden"
                }}
              >
                <Row className="align-items-center w-100 mx-0">
                  {/* Колонка для изображения */}
                  <Col
                    xs={3}
                    className="d-flex align-items-center justify-content-center px-0"
                    style={{ overflow: "hidden" }}
                  >
                    <Image
                      width={130}
                      height={130}
                      src={process.env.REACT_APP_API_URL + item.img}
                      style={{
                        objectFit: "contain",
                        borderRadius: "5px"
                      }}
                    />
                  </Col>

                  {/* Название и количество */}
                  <Col
                    xs={5}
                    className="d-flex align-items-center justify-content-start"
                  >
                    <div style={{ textAlign: "left" }}>
                      <strong>{item.name}</strong>
                      <span style={{ margin: "0 8px" }}>x</span>
                      {item.quantity}
                    </div>
                  </Col>

                  {/* Цена */}
                  <Col
                    xs={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    {item.price * item.quantity} руб.
                  </Col>

                  {/* Кнопка удаления */}
                  <Col
                    xs={2}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => cart.removeFromCart(item.id)}
                      style={{ border: "0px" }}
                    >
                      <FaTimes />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Блок "Очистить корзину" */}
        <Col
          md={4}
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            border: "0px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            height: "160px"
          }}
        >
          <Col className="d-flex flex-column align-items-center justify-content-center">
            <h5
              className="mt-3"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minWidth: "250px"
              }}
            >
              Итог: {cart.totalPrice} руб. ({cart.totalItems} товаров)
            </h5>
            <Button
              variant="outline-dark"
              onClick={() => cart.clearCart()}
              className="mt-2"
              style={{ width: "200px" }}
            >
              Очистить корзину
            </Button>
          </Col>
        </Col>
      </Row>
    </Container>
  );
});

export default Cart;
