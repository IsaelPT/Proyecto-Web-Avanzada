import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg p-6 flex justify-between items-center sticky top-0 z-40">
      <h1 className="text-2xl font-extrabold text-yellow-400 tracking-tight drop-shadow">🎬 CinemaHub</h1>
      <nav>
        <ul className="flex space-x-8 text-lg font-semibold">
          <li><Link to="/peliculas" className="text-white hover:text-yellow-300 transition">Películas</Link></li>
          <li><Link to="/actores" className="text-white hover:text-yellow-300 transition">Actores</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;