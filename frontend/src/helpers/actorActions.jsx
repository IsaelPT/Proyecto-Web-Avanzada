import axios from "axios";

export const updateActor = async (id, actorData) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/actors/${id}`, actorData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar actor:", error);
    return null;
  }
};

export const deleteActor = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/actors/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar actor:", error);
    return false;
  }
};
