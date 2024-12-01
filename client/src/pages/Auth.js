import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  console.log(location);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 55 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto"> {isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control className="mt-3" placeholder="Введите email" />
          <Form.Control className="mt-3" placeholder="Введите пароль" />
          {isLogin ? (
            <div
              className="d-flex justify-content-lg-start mt-3"
              style={{ fontSize: "15px" }}
            >
              Нет аккаунта?
              <NavLink style={{ marginLeft: "3px" }} to={REGISTRATION_ROUTE}>
                Регистрация
              </NavLink>
            </div>
          ) : (
            <div
              className="d-flex justify-content-lg-start mt-3"
              style={{ fontSize: "15px" }}
            >
              Есть аккаунт?
              <NavLink style={{ marginLeft: "3px" }} to={LOGIN_ROUTE}>
                Войти
              </NavLink>
            </div>
          )}
          <Button
            className="mt-3 align-self-center"
            variant={"outline-success"}
          >
            {isLogin ? "Войти" : "Регистрация"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
