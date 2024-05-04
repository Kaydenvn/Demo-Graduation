import { ISubject } from "src/types/Subject.type";
import http from "src/utils/http";

const controller = "/api/subjects";

export const getAllSubjects = async (page: number, pageSize: number) => {
  const response = await http.get(`${controller}`, {
    params: {
      page,
      pageSize,
    },
  });
  return response.data;
};

export const getSubjectById = async (id: string) => {
  const response = await http.get(`${controller}/${id}`);
  return response.data;
};

export const addSubject = async (data: ISubject) => {
  const response = await http.post(`${controller}`, {
    title: data.title,
    description: data.description,
    nameOfdocs: data.nameOfdocs,
    linkOfdocs: data.linkOfdocs,
    creator: data.creator,
    photo: data.photo,
  });
  return response.data;
};

export const updateSubject = async (data: ISubject) => {
  const response = await http.put(`${controller}/${data._id}`, {
    _id: data._id,
    title: data.title,
    description: data.description,
    nameOfdocs: data.nameOfdocs,
    linkOfdocs: data.linkOfdocs,
    creator: data.creator,
    photo: data.photo,
  });
  return response.data;
};

export const deleteSubject = async (id: string) => {
  const response = await http.delete(`${controller}/${id}`);
  return response.data;
};

export const getSubjectForThumbnail = async () => {
  const response = await http.get(`${controller}/thumbnail`);
  return response.data;
};
