import axios from "axios";

export const getMoviesActorsFiltered = async (theme) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/movies_actors/filter/${encodeURIComponent(theme)}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener movies_actors filtrados:", error);
    return null;
  }
};