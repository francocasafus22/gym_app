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

export async function deleteUser({userId}){
  try {
    const { data } = await api.delete(`/user/${userId}`);
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

export async function getAllEntrenamientosByUser(page = 1) {
  try {
    const { data } = await api.get(`/entrenamiento/me/?page=${page}`);
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
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getRutina(slug, id) {
  try {
    const params = new URLSearchParams();
    if (slug) params.append("slug", slug);
    if (id) params.append("id", id);

    const { data } = await api.get(`/rutina/one/?${params.toString()}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function addEjercicioToRutina({
  rutinaId,
  ejercicioId,
  formData,
}) {
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

export async function deleteExerciseInRutina({ rutinaId, ejercicioId }) {
  try {
    const { data } = await api.delete(
      `/rutina/${rutinaId}/ejercicio/${ejercicioId}`,
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

// Entrenamiento

export async function createEntrenamiento(entrenamiento) {
  try {
    const { data } = await api.post("/entrenamiento", entrenamiento);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getEntrenamientoById(id) {
  try {
    const { data } = await api.get(`/entrenamiento/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getStats() {
  try {
    const { data } = await api.get(`/entrenamiento/me/stats`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Ventas

export async function getAllProductos (query = "", page = 1){
  try {
    const { data } = await api.get(`/producto?q=${query}&page=${page}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}