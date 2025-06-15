import React from 'react';

const MovieCard = ({ movie, onSelect }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:scale-105 hover:shadow-2xl transition border border-gray-200 dark:border-gray-700"
      onClick={() => onSelect(movie)}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-56 object-cover rounded-t-2xl"
      />
      <div className="p-5">
        <h3 className="font-extrabold text-xl text-gray-900 dark:text-white mb-1">
          {movie.title}
        </h3>
        <p className="text-blue-600 dark:text-blue-300 text-sm mb-1">
          {movie.genre}
        </p>
        <p className="text-gray-500 text-xs mb-2">
          Actor principal:{' '}
          <span className="font-semibold">{movie.mainActor}</span>
        </p>
        <div className="flex items-center mt-2 text-yellow-500 gap-2">
          <span>⭐ {movie.imdbRating}/10</span>
          <span className="mx-1 text-gray-400">|</span>
          <span>{movie.duration} min</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;