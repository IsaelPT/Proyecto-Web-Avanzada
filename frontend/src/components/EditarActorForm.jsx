import React, { useState } from 'react';
import { updateActor } from '../helpers/actorActions';

const EditarActorForm = ({ actor, onUpdate, onClose }) => {
  const [form, setForm] = useState({ name: actor.name, age: actor.age });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.name && form.age) {
        const updated = await updateActor(actor.id, form);
        if (updated) {
          onUpdate(updated);
          onClose();
        } else {
          alert('Error al actualizar el actor');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Editar Actor</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Edad" type="number" className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" required />
      <div className="flex justify-end space-x-3 mt-6">
        <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Cancelar</button>
        <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
      </div>
    </form>
  );
};

export default EditarActorForm;
