import axios from "axios";

export const updateMovie = async (id, movieData) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/movies/${id}`, movieData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar película:", error);
    return null;
  }
};

export const deleteMovie = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/movies/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar película:", error);
    return false;
  }
};
