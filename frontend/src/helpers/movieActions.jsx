import axios from "axios";

export const updateMovie = async (id, movieData) => {
  try {
    const isFormData = movieData instanceof FormData;
    const response = await axios({
      method: 'post', // Cambia a POST con override para Laravel
      url: `http://localhost:8000/api/movies/${id}`,
      data: isFormData ? movieData : { ...movieData },
      headers: {
        ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {}),
        ...(isFormData ? { 'X-HTTP-Method-Override': 'PUT' } : {})
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar película:",
      error.response?.data || error
    );
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
