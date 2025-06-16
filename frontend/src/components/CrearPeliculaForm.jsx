import React, { useState, useEffect } from 'react';
import { getActors, getMovieActorById } from '../helpers/gets';
import { createMovie, createMovieActor } from '../helpers/posts';

const CrearPeliculaForm = ({ onCreate, onClose }) => {
  const [form, setForm] = useState({
    title: '',
    year: '',
    genre: '',
    photo: null,
    actor_id: '',
  });
  const [actores, setActores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActors = async () => {
      const data = await getActors();
      setActores(data || []);
    };
    fetchActors();
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      // Crear película en movies
      const movieFormData = new FormData();
      movieFormData.append('title', form.title);
      movieFormData.append('year', form.year);
      movieFormData.append('genre', form.genre);
      if (form.photo) movieFormData.append('photo', form.photo);
      const movie = await createMovie(movieFormData);
      // Crear relación en movies_actors
      if (movie && form.actor_id) {
        const movieActor = await createMovieActor({ movie_id: movie.id, actor_id: form.actor_id });
        if (movieActor && movieActor.id) {
          const movieActorFull = await getMovieActorById(movieActor.id);
          if (movieActorFull) {
            onCreate(movieActorFull);
            onClose();
            setLoading(false);
            return;
          }
        }
      }
      if (movie) {
        onCreate(movie);
        onClose();
      }
    } catch {
      alert('Error al crear la película');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Crear Nueva Película</h2>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género" className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
        <input name="year" value={form.year} onChange={handleChange} placeholder="Año" className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
        <input type="file" name="photo" accept="image/*" onChange={handleChange} className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" />
        <select name="actor_id" value={form.actor_id} onChange={handleChange} className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required>
          <option value="">Selecciona actor principal</option>
          {actores.map(actor => (
            <option key={actor.id} value={actor.id}>{actor.name}</option>
          ))}
        </select>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</button>
        </div>
      </form>
    </div>
  );
};

export default CrearPeliculaForm;
