import {
  ADMIN_ROUTE,
  CART_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE
} from "./utils/consts";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import DevicePage from "./pages/DevicePage";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  }
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop
  },
  {
    path: CART_ROUTE,
    Component: Cart
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: DEVICE_ROUTE + "/:id",
    Component: DevicePage
  }
];
