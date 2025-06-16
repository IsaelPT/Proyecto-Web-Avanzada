import React from 'react';

const Hero = ({ movie, onPrev, onNext }) => {
  if (!movie) return null;
  return (
    <section className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl mb-8 mt-6 border border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 p-8">
        <img src={`http://localhost${movie.movie_photo_path}`} alt={movie.movie_title} className="rounded-2xl shadow-lg w-56 h-80 object-cover border-4 border-white/40" />
        <div className="flex-1 text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center mb-2 gap-4">
            <button onClick={onPrev} className="text-3xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-3 py-1 transition">&#8592;</button>
            <span className="text-lg font-bold tracking-wide text-gray-700 dark:text-gray-200">{movie.movie_year}</span>
            <button onClick={onNext} className="text-3xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-3 py-1 transition">&#8594;</button>
          </div>
          <h2 className="text-4xl font-extrabold mb-2 text-gray-900 dark:text-white drop-shadow-lg">{movie.movie_title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2 text-lg">{movie.movie_genre}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-2">Actor principal: <span className="font-semibold">{movie.actor_name}</span></p>
          <p className="text-gray-600 dark:text-gray-400 mb-2">Género: <span className="font-semibold">{movie.movie_genre}</span></p>
          <button className="bg-red-600 text-white font-bold py-2 px-8 rounded-full shadow hover:bg-red-700 transition mt-4">Ver Trailer</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;