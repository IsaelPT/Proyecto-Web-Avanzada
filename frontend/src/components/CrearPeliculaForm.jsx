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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchActors = async () => {
      const data = await getActors();
      setActores(data || []);
    };
    fetchActors();
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
        if (!value.trim()) msg = 'El año es obligatorio.';
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
    newErrors.year = !form.year.trim() ? 'El año es obligatorio.' : (!/^[0-9]{4}$/.test(form.year) ? 'El año debe tener 4 dígitos.' : (parseInt(form.year) < 1888 ? 'El año debe ser 1888 o posterior.' : (parseInt(form.year) > maxYear ? `El año no puede ser mayor a ${maxYear}.` : '')));
    newErrors.photo = form.photo && form.photo.type && !form.photo.type.startsWith('image/') ? 'Solo se permiten imágenes.' : '';
    newErrors.actor_id = !form.actor_id ? 'Selecciona un actor principal.' : '';
    setErrors(newErrors);
    if (Object.values(newErrors).some(msg => msg)) return;
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
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
        {errors.title && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.title}</div>}
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género" className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
        {errors.genre && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.genre}</div>}
        <input name="year" value={form.year} onChange={handleChange} placeholder="Año" className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
        {errors.year && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.year}</div>}
        <input type="file" name="photo" accept="image/*" onChange={handleChange} className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" />
        {errors.photo && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.photo}</div>}
        <select name="actor_id" value={form.actor_id} onChange={handleChange} className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required>
          <option value="">Selecciona actor principal</option>
          {actores.map(actor => (
            <option key={actor.id} value={actor.id}>{actor.name}</option>
          ))}
        </select>
        {errors.actor_id && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.actor_id}</div>}
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</button>
        </div>
      </form>
    </div>
  );
};

export default CrearPeliculaForm;
