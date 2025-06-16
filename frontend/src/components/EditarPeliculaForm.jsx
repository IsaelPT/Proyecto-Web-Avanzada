import React, { useState, useEffect } from 'react';
import { updateMovie } from '../helpers/movieActions';
import { getActors } from '../helpers/gets';
import { updateMovieActor } from '../helpers/movieActorActions';

const EditarPeliculaForm = ({ movie, movieActors, onUpdate, onClose }) => {
  const [form, setForm] = useState({
    title: movie.movie_title,
    year: movie.movie_year,
    genre: movie.movie_genre,
    photo_path: movie.movie_photo_path,
    actor_id: movie.actor_id // actor actual
  });
  const [loading, setLoading] = useState(false);
  const [actores, setActores] = useState([]);

  useEffect(() => {
    getActors().then(data => setActores(data || []));
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
      const movieId = movie.movie_id || movie.id;
      // Actualizar película (datos y foto)
      const movieFormData = new FormData();
      movieFormData.append('title', form.title);
      movieFormData.append('year', form.year);
      movieFormData.append('genre', form.genre);
      if (form.photo) {
        movieFormData.append('photo', form.photo);
      }
      const updated = await updateMovie(movieId, movieFormData);
      // Actualizar actor en movie_actor si cambió
      if (form.actor_id && form.actor_id !== movie.actor_id) {
        await updateMovieActor(movie.id, { actor_id: form.actor_id });
      }
      if (updated) {
        const updatedMovieActor = movieActors?.find(ma => ma.movie_id === movieId) || movie;
        onUpdate({ ...updatedMovieActor, ...updated, actor_id: form.actor_id });
        onClose();
      } else {
        alert('Error al actualizar la película');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Editar Película</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
      <input name="year" value={form.year} onChange={handleChange} placeholder="Año" type="number" className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
      <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género" className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
      <select name="actor_id" value={form.actor_id} onChange={handleChange} className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800">
        <option value="">Selecciona un actor</option>
        {actores.map(actor => (
          <option key={actor.id} value={actor.id}>{actor.name}</option>
        ))}
      </select>
      <input name="photo" type="file" accept="image/*" onChange={handleChange} className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" />
      <div className="flex justify-end space-x-3 mt-6">
        <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Cancelar</button>
        <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
      </div>
    </form>
  );
};

export default EditarPeliculaForm;
