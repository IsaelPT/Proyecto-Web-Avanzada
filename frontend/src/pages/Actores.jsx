import React, { useState, useEffect } from 'react';
import CrearActorForm from '../components/CrearActorForm';
import EditarActorForm from '../components/EditarActorForm';
import Modal from '../components/Modal';
import { getActors } from '../helpers/gets';
import { deleteActor } from '../helpers/actorActions';

const Actores = () => {
  const [actors, setActors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editActor, setEditActor] = useState(null);
  const [deleteActorId, setDeleteActorId] = useState(null);

  useEffect(() => {
    const fetchActors = async () => {
      const data = await getActors();
      setActors(data || []);
    };
    fetchActors();
  }, []);

  const handleCreateActor = (actor) => {
    setActors([actor, ...actors]);
  };

  const handleUpdateActor = (updated) => {
    setActors(actors.map(a => a.id === updated.id ? updated : a));
  };

  const handleDeleteActor = async (id) => {
    const ok = await deleteActor(id);
    if (ok) setActors(actors.filter(a => a.id !== id));
    setDeleteActorId(null);
  };

  return (
    <div className="py-12 px-4 md:px-16 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Actores</h2>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition">+ Nuevo Actor</button>
      </div>
      <ul className="space-y-4">
        {actors.map(actor => (
          <li key={actor.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex justify-between items-center border border-gray-200 dark:border-gray-700">
            <div>
              <span className="font-semibold text-lg text-gray-900 dark:text-white">{actor.name}</span>
              <span className="ml-4 text-blue-600 dark:text-blue-300 font-bold text-lg">{actor.age} años</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditActor(actor)} className="px-4 py-1 bg-yellow-400 text-white rounded-lg font-bold hover:bg-yellow-500 transition">Editar</button>
              <button onClick={() => setDeleteActorId(actor.id)} className="px-4 py-1 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      {showForm && (
        <CrearActorForm onCreate={handleCreateActor} onClose={() => setShowForm(false)} />
      )}
      {editActor && (
        <Modal isOpen={!!editActor} onClose={() => setEditActor(null)}>
          <EditarActorForm actor={editActor} onUpdate={handleUpdateActor} onClose={() => setEditActor(null)} />
        </Modal>
      )}
      {deleteActorId && (
        <Modal isOpen={!!deleteActorId} onClose={() => setDeleteActorId(null)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">¿Eliminar actor?</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteActorId(null)} className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Cancelar</button>
              <button onClick={() => handleDeleteActor(deleteActorId)} className="px-5 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">Eliminar</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Actores;
