import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleClose = () => setShowModal(false);

  const click = async () => {
    try {
      if (!email || !password) {
        setModalMessage("Введите email и пароль от учётной записи");
        setShowModal(true);

        return;
      }
      setLoading(true);

      let data;

      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);

      if (data.role === "ADMIN") {
        user.setIsAdmin(true);
      } else {
        user.setIsAdmin(false);
      }

      navigate(SHOP_ROUTE);
    } catch (error) {
      console.error(error.response?.data?.message);
      if (error.response?.data?.message.includes("already exists")) {
        setModalMessage("Данный email уже используется");
        setShowModal(true);
      } else if (error.response?.data?.message.includes("Invalid")) {
        setModalMessage("Введён некорректный email или пароль");
        setShowModal(true);
      } else if (error.response?.data?.message.includes("No user found")) {
        setModalMessage("Пользователя с таким email не существует");
        setShowModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(location);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 55 }}
    >
      {loading ? (
        <div className="jewish-loader-container">
          <div className="jewish-loader"></div>
        </div>
      ) : (
        <Card style={{ width: 600 }} className="p-5">
          <h2 className="m-auto"> {isLogin ? "Авторизация" : "Регистрация"}</h2>
          <Form className="d-flex flex-column">
            <Form.Control
              className="mt-3"
              placeholder="Введите email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Control
              className="mt-3"
              placeholder="Введите пароль"
              value={password}
              onChange={p => setPassword(p.target.value)}
              type="password"
            />
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
              onClick={click}
            >
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </Form>
        </Card>
      )}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ошибка</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
});

export default Auth;
