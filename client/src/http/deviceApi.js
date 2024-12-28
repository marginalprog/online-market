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

  return data;
};

export const createBrand = async brand => {
  if (!brand) {
    throw new Error("Brand must be provided");
  }

  const { data } = await $authHost.post(`api/v1/brand`, brand);

  return data;
};

export const deleteBrand = async id => {
  if (!id) {
    throw new Error("BrandId must be provided");
  }

  const { data } = await $authHost.delete(`api/v1/brand/${id}`);

  return data;
};

export const deleteType = async id => {
  if (!id) {
    throw new Error("TypeId must be provided");
  }

  const { data } = await $authHost.delete(`api/v1/type/${id}`);

  return data;
};

export const updateType = async (typeId, typeData) => {
  if (!typeId || !typeData) {
    throw new Error("Data and typeId must be provided");
  }

  const { data } = await $authHost.patch(`api/v1/type/${typeId}`, typeData);

  return data;
};

export const deleteDevice = async id => {
  if (!id) {
    throw new Error("DeviceId must be provided");
  }

  const { data } = await $authHost.delete(`api/v1/device/${id}`);

  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get(`api/v1/brand`);

  return data.rows;
};

export const updateBrand = async (brandId, brandData) => {
  if (!brandId || !brandData) {
    throw new Error("Data and brandId must be provided");
  }

  const { data } = await $authHost.patch(`api/v1/brand/${brandId}`, brandData);

  return data;
};

export const fetchOneBrand = async id => {
  const { data } = await $host.get(`api/v1/brand/${id}`);

  return data;
};

export const createDevice = async deviceData => {
  if (!deviceData) {
    throw new Error("Data must be provided");
  }

  const { data } = await $authHost.post(`api/v1/device`, deviceData);

  return data;
};

export const updateDevice = async (deviceId, deviceData) => {
  if (!deviceId || !deviceData) {
    throw new Error("Data and deviceId must be provided");
  }

  const { data } = await $authHost.patch(
    `api/v1/device/${deviceId}`,
    deviceData
  );

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
