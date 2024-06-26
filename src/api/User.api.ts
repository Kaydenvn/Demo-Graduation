import { IUser } from "src/types/User.type";
import http from "src/utils/http";

const controller = "/api/users";

export const getAllUsers = async (page: number, pageSize: number) => {
  const response = await http.get(`${controller}`, {
    params: {
      page,
      pageSize,
    },
  });
  return response.data;
};

export const getUser = async () => {
  try {
    const response = await http.get(`${controller}/me`);
    const user = response.data;
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (id: string) => {
  if (!id) {
    return;
  }
  const response = await http.get(`${controller}/${id}`);
  return response.data;
};

export const addUser = async (data: IUser) => {
  return http.post(`${controller}/register`, {
    mssv: data.mssv,
    name: data.name,
    email: data.email,
    role: data.role,
    status: data.status,
    password: data.password,
  });
};

export const deleteUser = async (id: string) => {
  return http.delete(`${controller}/${id}`);
};

export const updateUser = async (data: IUser) => {
  return http.put(`${controller}/${data._id}`, {
    mssv: data.mssv,
    name: data.name,
    email: data.email,
    role: data.role,
    status: data.status,
    password: data.password,
  });
};

export const countUser = async () => {
  const response = await http.get(`${controller}/count`);
  return response.data;
};
