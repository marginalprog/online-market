import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post(`api/v1/user/registration`, {
    email,
    password
  });

  console.log(data);
  console.log(data.token);

  localStorage.setItem("token", data.token);

  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post(`api/v1/user/login`, {
    email,
    password
  });

  localStorage.setItem("token", data.token);

  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get(`api/v1/user/auth`);

  localStorage.setItem("token", data.token);

  return jwtDecode(data.token);
};
