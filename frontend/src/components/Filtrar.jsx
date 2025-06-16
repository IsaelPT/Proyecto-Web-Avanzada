import React from "react";

const Filtrar = ({ value, onChange, placeholder = "Buscar..." }) => {
  return (
    <div className="flex justify-center my-6">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full max-w-md px-5 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-lg shadow focus:ring-2 focus:ring-blue-400 outline-none transition"
        aria-label="Filtrar películas"
      />
    </div>
  );
};

export default Filtrar;
