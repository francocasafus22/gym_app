import { isAxiosError } from "axios";
import api from "../config/axios";

/* Usuarios */
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

export async function createUser(formData) {
  try {
    const { data } = await api.post("/user/register", formData);
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

export async function getAllUsers(q = "", currentPage = 1) {
  try {
    const { data } = await api.get(`/user?q=${q}&page=${currentPage}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function asignarMembresia(formData) {
  try {
    const { data } = await api.post("/user/asignar-membresia", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function asignarRutina(formData) {
  try {
    const { data } = await api.post("/user/asignar-rutina", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

/* Membresias Tipo */
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

export async function editMembresiaTipo({ nombre, precio, descripcion }) {
  try {
    const { data } = await api.patch(`/membresiaTipo/${nombre}`, {
      precio,
      descripcion,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

/* Rutinas */
export async function getAllRutinas() {
  try {
    const { data } = await api.get("/rutina");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function createRutina(formData) {
  try {
    const { data } = await api.post("/rutina", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function assignEjercicioToRutina(ejercicioId, rutinaId, formData) {
  try {
    const { data } = await api.post(
      `/rutina/${rutinaId}/ejercicio/${ejercicioId}`,
      formData,
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function editRutina({ rutinaId, formData }) {
  try {
    const { data } = await api.patch(`/rutina/${rutinaId}`, formData);
    console.log(formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getRutinaBySlug(slug) {
  try {
    const { data } = await api.get(`/rutina/${slug}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function addEjercicioToRutina(rutinaId, ejercicioId, formData) {
  try {
    const { data } = await api.post(
      `/rutina/${rutinaId}/ejercicio/${ejercicioId}`,
      formData,
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getByName(name, page) {
  try {
    const { data } = await api.get(`/ejercicio/?q=${name}&page=${page}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getAll() {
  try {
    const { data } = await api.get(`/ejercicio/all`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
