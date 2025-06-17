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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getActors().then(data => setActores(data || []));
  }, []);

  // Validaciones en tiempo real
  const validate = (field, value) => {
    let msg = '';
    switch (field) {
      case 'title':
        if (!value.trim()) msg = 'Por favor, ingresa un título para la película 😊';
        else if (value.length < 3) msg = 'El título debe tener al menos 3 letras.';
        else if (/^[0-9]/.test(value)) msg = 'El título no puede comenzar con un número.';
        break;
      case 'genre':
        if (!value.trim()) msg = '¡No olvides el género!';
        else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) msg = 'El género solo puede contener letras y espacios.';
        break;
      case 'year':
        if (!value.toString().trim()) msg = 'El año es obligatorio.';
        else if (!/^[0-9]{4}$/.test(value)) msg = 'El año debe tener 4 dígitos.';
        else if (parseInt(value) < 1888) msg = 'El año debe ser 1888 o posterior.';
        else if (parseInt(value) > new Date().getFullYear() + 3) msg = 'El año no puede ser mayor a ' + (new Date().getFullYear() + 3) + '.';
        break;
      case 'photo':
        if (value && value.type && !value.type.startsWith('image/')) msg = 'Solo se permiten imágenes.';
        break;
      case 'actor_id':
        if (!value) msg = 'Selecciona un actor principal.';
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [field]: msg }));
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files[0] });
      validate('photo', files[0]);
    } else {
      setForm({ ...form, [name]: value });
      validate(name, value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 3;
    const newErrors = {};
    newErrors.title = !form.title.trim() ? 'Por favor, ingresa un título para la película 😊' : (form.title.length < 3 ? 'El título debe tener al menos 3 letras.' : (/^[0-9]/.test(form.title) ? 'El título no puede comenzar con un número.' : ''));
    newErrors.genre = !form.genre.trim() ? '¡No olvides el género!' : (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.genre) ? 'El género solo puede contener letras y espacios.' : '');
    newErrors.year = !form.year.toString().trim() ? 'El año es obligatorio.' : (!/^[0-9]{4}$/.test(form.year) ? 'El año debe tener 4 dígitos.' : (parseInt(form.year) < 1888 ? 'El año debe ser 1888 o posterior.' : (parseInt(form.year) > maxYear ? `El año no puede ser mayor a ${maxYear}.` : '')));
    newErrors.photo = form.photo && form.photo.type && !form.photo.type.startsWith('image/') ? 'Solo se permiten imágenes.' : '';
    newErrors.actor_id = !form.actor_id ? 'Selecciona un actor principal.' : '';
    setErrors(newErrors);
    if (Object.values(newErrors).some(msg => msg)) return;
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
      <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
      {errors.title && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.title}</div>}
      <input name="year" value={form.year} onChange={handleChange} placeholder="Año" type="number" className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
      {errors.year && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.year}</div>}
      <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género" className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
      {errors.genre && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.genre}</div>}
      <select name="actor_id" value={form.actor_id} onChange={handleChange} className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800">
        <option value="">Selecciona un actor</option>
        {actores.map(actor => (
          <option key={actor.id} value={actor.id}>{actor.name}</option>
        ))}
      </select>
      {errors.actor_id && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.actor_id}</div>}
      <input name="photo" type="file" accept="image/*" onChange={handleChange} className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" />
      {errors.photo && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.photo}</div>}
      <div className="flex justify-end space-x-3 mt-6">
        <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Cancelar</button>
        <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
      </div>
    </form>
  );
};

export default EditarPeliculaForm;
