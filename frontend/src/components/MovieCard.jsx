import React from 'react';

const MovieCard = ({ movie, onSelect }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:scale-105 hover:shadow-2xl transition border border-gray-200 dark:border-gray-700"
      onClick={() => onSelect(movie)}
    >
      <img
        src={`http://localhost${movie.movie_photo_path}`}
        alt={movie.movie_title}
        className="w-full h-56 object-cover rounded-t-2xl"
      />
      <div className="p-5">
        <h3 className="font-extrabold text-xl text-gray-900 dark:text-white mb-1">
          {movie.movie_title}
        </h3>
        <p className="text-blue-600 dark:text-blue-300 text-sm mb-1">
          {movie.movie_genre}
        </p>
        <p className="text-gray-500 text-xs mb-2">
          Actor principal:{' '}
          <span className="font-semibold">{movie.actor_name}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;