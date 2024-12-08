import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userApi";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("token")) {
        check()
          .then(data => {
            user.setUser(true);
            user.setIsAuth(true);
            user.setIsAdmin(data.role === "ADMIN");
          })
          .catch(error => {
            console.error("Failed to check authentication:", error);
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="jewish-loader-container">
        <div className="jewish-loader"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
