import axios from "axios";

export const updateMovieActor = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/movies_actors/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar movie_actor:", error);
    return null;
  }
};
