import React, { useState } from 'react';
import { createActor } from '../helpers/posts';

const CrearActorForm = ({ onCreate, onClose }) => {
  const [form, setForm] = useState({ name: '', age: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validaciones en tiempo real
  const validate = (field, value) => {
    let msg = '';
    switch (field) {
      case 'name':
        if (!value.trim()) msg = 'Por favor, ingresa el nombre del actor 😊';
        else if (value.length < 3) msg = 'El nombre debe tener al menos 3 letras.';
        else if (/^[0-9]/.test(value)) msg = 'El nombre no puede comenzar con un número.';
        else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/.test(value)) msg = 'El nombre solo puede contener letras, espacios y guiones.';
        else if (/\d/.test(value)) msg = 'El nombre no puede contener números.';
        break;
      case 'age':
        if (!value.toString().trim()) msg = 'La edad es obligatoria.';
        else if (isNaN(value) || value <= 1) msg = 'La edad debe ser mayor que 1.';
        else if (value >= 100) msg = 'La edad debe ser menor que 100.';
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [field]: msg }));
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    validate(e.target.name, e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = {};
    newErrors.name = !form.name.trim() ? 'Por favor, ingresa el nombre del actor 😊' :
      (form.name.length < 3 ? 'El nombre debe tener al menos 3 letras.' :
      (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/.test(form.name) ? 'El nombre solo puede contener letras, espacios y guiones.' :
      (/\d/.test(form.name) ? 'El nombre no puede contener números.' :
      (/^[0-9]/.test(form.name) ? 'El nombre no puede comenzar con un número.' : ''))));
    newErrors.age = !form.age.toString().trim() ? 'La edad es obligatoria.' : (isNaN(form.age) || form.age <= 1 ? 'La edad debe ser mayor que 1.' : (form.age >= 100 ? 'La edad debe ser menor que 100.' : ''));
    setErrors(newErrors);
    if (Object.values(newErrors).some(msg => msg)) return;
    setLoading(true);
    try {
      if (form.name && form.age) {
        const actor = await createActor(form);
        if (actor) {
          onCreate(actor);
          onClose();
        } else {
          alert('Error al crear el actor');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Agregar Actor</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
        {errors.name && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.name}</div>}
        <input name="age" value={form.age} onChange={handleChange} placeholder="Edad" type="number" className="w-full mb-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
        {errors.age && <div className="text-red-500 text-sm mb-3 animate-pulse">{errors.age}</div>}
        <div className="flex justify-end space-x-3 mt-6">
          <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Cancelar</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700" disabled={loading}>{loading ? 'Agregando...' : 'Agregar'}</button>
        </div>
      </form>
    </div>
  );
};

export default CrearActorForm;
