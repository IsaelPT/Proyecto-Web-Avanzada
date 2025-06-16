import React, { useState } from 'react';
import { updateMovie } from '../helpers/movieActions';

const EditarPeliculaForm = ({ movie, movieActors, onUpdate, onClose }) => {
  const [form, setForm] = useState({
    title: movie.movie_title,
    year: movie.movie_year,
    genre: movie.movie_genre,
    photo_path: movie.movie_photo_path
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      // Usar movie.movie_id si existe, sino movie.id
      const movieId = movie.movie_id;
      const dataToSend = {
        ...form,
        photo_path: form.photo_path || movie.photo_path
      };
      console.log('Updated movie:', dataToSend);
      if (dataToSend.title && dataToSend.year && dataToSend.genre) {
        const updated = await updateMovie(movieId, dataToSend);
        
        if (updated) {
          // Buscar el movie_actor actualizado
          const updatedMovieActor = movieActors?.find(ma => ma.movie_id === movieId) || movie;
          onUpdate({ ...updatedMovieActor, ...updated });
          onClose();
        } else {
          alert('Error al actualizar la película');
        }
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
      <input name="photo_path" value={form.photo_path} onChange={handleChange} placeholder="Ruta de la imagen" className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" />
      <div className="flex justify-end space-x-3 mt-6">
        <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Cancelar</button>
        <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
      </div>
    </form>
  );
};

export default EditarPeliculaForm;
