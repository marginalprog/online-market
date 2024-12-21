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

  return data.rows;
};

export const fetchOneType = async id => {
  const { data } = await $host.get(`api/v1/type/${id}`);

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

  return data.rows;
};

export const fetchOneBrand = async id => {
  const { data } = await $host.get(`api/v1/brand/${id}`);

  return data.rows;
};

export const createDevice = async deviceData => {
  if (!deviceData) {
    throw new Error("Data must be provided");
  }

  const { data } = await $authHost.post(`api/v1/device`, deviceData);

  return data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get(`api/v1/device`, {
    params: {
      typeId,
      brandId,
      page,
      limit
    }
  });

  return data;
};

export const fetchOneDevice = async id => {
  const { data } = await $host.get(`api/v1/device/${id}`);

  return data;
};
