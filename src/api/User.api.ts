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
