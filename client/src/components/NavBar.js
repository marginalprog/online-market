import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import {
  ADMIN_ROUTE,
  CART_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE
} from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = observer(() => {
  const { user, cart } = useContext(Context);

  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    user.setIsAdmin(false);
    localStorage.removeItem("token");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to={SHOP_ROUTE}
        >
          GoiStore
        </NavLink>
        {user.isAuth ? (
          <Nav className="d-flex" style={{ color: "white" }}>
            {user.isAdmin ? (
              <Button
                variant={"outline-light"}
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админ-панель
              </Button>
            ) : (
              <></>
            )}

            <Button
              variant={"outline-light"}
              onClick={() => navigate(CART_ROUTE)}
              style={{ marginLeft: "1rem" }}
            >
              <span>Корзина</span>
              {cart.totalItems > 0 ? <span> {cart.totalItems} </span> : <></>}
              <FontAwesomeIcon
                icon={faShoppingCart}
                size="lg"
                className="ms-2"
              />
            </Button>

            <Button
              variant={"outline-light"}
              style={{ marginLeft: "1rem" }}
              className=""
              onClick={() => {
                logOut();
                navigate(LOGIN_ROUTE);
              }}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(CART_ROUTE)}
              style={{ marginLeft: "1rem", marginRight: "1rem" }}
            >
              <span>Корзина</span>
              <FontAwesomeIcon
                icon={faShoppingCart}
                size="lg"
                className="ms-2"
              />
            </Button>

            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
