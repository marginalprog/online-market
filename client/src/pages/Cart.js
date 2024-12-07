import React, { useContext } from "react";
import { Context } from "../index";
import { Button, Container, Image, ListGroup } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";

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
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-column align-items-center mt-2">
        <h2>Корзина</h2>
        <ListGroup>
          {cart.items.map(item => (
            <ListGroup.Item key={item.id} className="d-flex align-items-center">
              <Image width={200} height={260} src={item.img} />
              <div>
                <strong>{item.name}</strong> x {item.quantity}
              </div>
              <div>{item.price * item.quantity} руб.</div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => cart.removeFromCart(item.id)}
              >
                Удалить
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5 className="mt-3">
          Итог: {cart.totalPrice} руб. ({cart.totalItems} товаров)
        </h5>
        <Button
          variant="outline-dark"
          onClick={cart.clearCart}
          className="mt-2"
          style={{ width: "200px" }}
        >
          Очистить корзину
        </Button>
      </div>
    </Container>
  );
});

export default Cart;
