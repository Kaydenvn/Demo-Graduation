import { IModel } from "src/types/Model.type";
import http from "src/utils/http";

const controller = "/api/models";

export const getAllModels = async (page: number, pageSize: number) => {
  const response = await http.get(`${controller}`, {
    params: {
      page,
      pageSize,
    },
  });
  return response.data;
};

export const getModelById = async (id: string) => {
  const response = await http.get(`${controller}/${id}`);
  return response.data;
};

export const addModel = async (data: IModel) => {
  const response = await http.post(`${controller}`, data);
  return response.data;
};

export const updateModel = async (data: IModel) => {
  const response = await http.put(`${controller}`, data);
  return response.data;
};

export const deleteModel = async (id: string) => {
  const response = await http.delete(`${controller}/${id}`);
  return response.data;
};
