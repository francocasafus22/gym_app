import { isAxiosError } from "axios";
import api from "../config/axios";

export async function login(formData) {
  try {
    const { data } = await api.post("/user/login", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUser() {
  try {
    const { data } = await api.get("/user/me");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getAllUsers() {
  try {
    const { data } = await api.get("/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getAllMembresiaTipo() {
  try {
    const { data } = await api.get("/membresiaTipo");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function editMembresiaTipo({nombre, precio, descripcion}) {
  try {
    console.log(nombre);
    
    const {data} = await api.patch(`/membresiaTipo/${nombre}`, {precio, descripcion});
   
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
