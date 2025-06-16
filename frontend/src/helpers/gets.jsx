import axios from "axios";

export const getMovies = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/movies");
    return response.data;
  } catch (error) {
    console.error("Error al obtener movies:", error);
    return null;
  }
};

export const getMoviesActors = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/movies_actors");
    return response.data;
  } catch (error) {
    console.error("Error al obtener movies_actors:", error);
    return null;
  }
};

export const getActors = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/actors");
    return response.data;
  } catch (error) {
    console.error("Error al obtener actores:", error);
    return null;
  }
};