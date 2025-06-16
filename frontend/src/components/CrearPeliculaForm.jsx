import React, { useState } from 'react';

// Formulario para crear una nueva película
const actoresFalsos = [
  { id: 1, name: 'Actor 1' },
  { id: 2, name: 'Actor 2' },
  { id: 3, name: 'Actor 3' },
];

const CrearPeliculaForm = ({ onCreate, onClose }) => {
  const [form, setForm] = useState({
    title: '',
    mainActor: '',
    genre: '',
    imdbRating: '',
    duration: '',
    year: '',
    poster: '',
    cinema: '',
    cinemaRating: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.title && form.mainActor && form.genre) {
      onCreate({ ...form, id: Date.now(), genres: [form.genre] });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Crear Nueva Película</h2>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
        <select name="mainActor" value={form.mainActor} onChange={handleChange} className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required>
          <option value="">Selecciona actor principal</option>
          {actoresFalsos.map(actor => (
            <option key={actor.id} value={actor.name}>{actor.name}</option>
          ))}
        </select>
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género" className="w-full mb-2 p-2 border rounded" required />
        <input name="imdbRating" value={form.imdbRating} onChange={handleChange} placeholder="IMDB Rating" className="w-full mb-2 p-2 border rounded" />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duración (min)" className="w-full mb-2 p-2 border rounded" />
        <input name="year" value={form.year} onChange={handleChange} placeholder="Año" className="w-full mb-2 p-2 border rounded" />
        <input name="poster" value={form.poster} onChange={handleChange} placeholder="URL de la imagen" className="w-full mb-2 p-2 border rounded" />
        <input name="cinema" value={form.cinema} onChange={handleChange} placeholder="Cine" className="w-full mb-2 p-2 border rounded" />
        <input name="cinemaRating" value={form.cinemaRating} onChange={handleChange} placeholder="Rating del cine" className="w-full mb-2 p-2 border rounded" />
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Crear</button>
        </div>
      </form>
    </div>
  );
};

export default CrearPeliculaForm;
