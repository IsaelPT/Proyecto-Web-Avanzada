import axios from "axios";

export const createMovie = async (movieData) => {
  try {
    const response = await axios.post("http://localhost:8000/api/movies", movieData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear película:", error);
    return null;
  }
};

export const createActor = async (actorData) => {
  try {
    const response = await axios.post("http://localhost:8000/api/actors", actorData);
    return response.data;
  } catch (error) {
    console.error("Error al crear actor:", error);
    return null;
  }
};

export const createMovieActor = async (movieActorData) => {
  try {
    const response = await axios.post("http://localhost:8000/api/movies_actors", movieActorData);
    return response.data;
  } catch (error) {
    console.error("Error al crear relación movie-actor:", error);
    return null;
  }
};