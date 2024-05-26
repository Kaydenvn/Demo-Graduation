import http from "src/utils/http";
import { IObd } from "src/types/Obd.type";

const controller = "/api/obds";

export const getAllObds = async (page: number, pageSize: number) => {
  const response = await http.get(`${controller}`, {
    params: {
      page,
      pageSize,
    },
  });
  return response.data;
};

export const getObdById = async (id: string) => {
  const response = await http.get(`${controller}/${id}`);
  return response.data;
};

export const addObd = async (data: IObd) => {
  const response = await http.post(`${controller}`, data);
  return response.data;
};

export const updateObd = async (data: IObd) => {
  const response = await http.put(`${controller}/${data._id}`, {
    title: data.title,
    description: data.description,
    createDate: data.createDate,
    status: data.status,
    doneDate: data.doneDate,
  });
  return response.data;
};

export const deleteObd = async (id: string) => {
  const response = await http.delete(`${controller}/${id}`);
  return response.data;
};
