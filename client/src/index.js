import React, { createContext } from "react";
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import CartStore from "./store/CartStore";
import { createRoot } from "react-dom/client";

export const Context = createContext(null);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
      cart: new CartStore()
    }}
  >
    <App />
  </Context.Provider>
);
