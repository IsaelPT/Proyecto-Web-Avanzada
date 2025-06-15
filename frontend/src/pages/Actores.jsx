import React, { useState } from 'react';
import CrearActorForm from '../components/CrearActorForm';

// Datos falsos iniciales
const actorsInit = [
  { id: 1, name: 'Actor 1', age: 35 },
  { id: 2, name: 'Actor 2', age: 42 },
];

const Actores = () => {
  const [actors, setActors] = useState(actorsInit);
  const [showForm, setShowForm] = useState(false);

  const handleCreateActor = (actor) => {
    setActors([actor, ...actors]);
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
            <span className="font-semibold text-lg text-gray-900 dark:text-white">{actor.name}</span>
            <span className="text-blue-600 dark:text-blue-300 font-bold text-lg">{actor.age} años</span>
          </li>
        ))}
      </ul>
      {showForm && (
        <CrearActorForm onCreate={handleCreateActor} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Actores;
