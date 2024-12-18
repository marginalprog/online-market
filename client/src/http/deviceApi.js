import { $authHost, $host } from "./index";

export const createType = async type => {
  if (!type) {
    throw new Error("Type must be provided");
  }

  const { data } = await $authHost.post(`api/v1/type`, type);

  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get(`api/v1/type`);

  console.log(data);

  return data.rows;
};

export const fetchOneType = async id => {
  const { data } = await $host.get(`api/v1/type/${id}`);

  console.log(data);

  return data.rows;
};

export const createBrand = async brand => {
  if (!brand) {
    throw new Error("Brand must be provided");
  }

  const { data } = await $authHost.post(`api/v1/brand`, brand);

  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get(`api/v1/brand`);

  console.log(data);

  return data.rows;
};

export const fetchOneBrand = async id => {
  const { data } = await $host.get(`api/v1/brand/${id}`);

  console.log(data);

  return data.rows;
};

export const createDevice = async deviceData => {
  if (!deviceData) {
    throw new Error("Data must be provided");
  }
  console.log(deviceData);

  const { data } = await $authHost.post(`api/v1/device`, deviceData);

  return data;
};

export const fetchDevices = async () => {
  const { data } = await $host.get(`api/v1/device`);

  console.log(data);

  return data.rows;
};

export const fetchOneDevice = async id => {
  const { data } = await $host.get(`api/v1/device/${id}`);

  console.log(data);

  return data;
};
