import React, { useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import Hero from '../components/Hero';
import CrearPeliculaForm from '../components/CrearPeliculaForm';
import Filtrar from '../components/Filtrar';

// Datos falsos para películas con imágenes reales de internet
const moviesDataInit = [
  {
    id: 1,
    title: 'Dune: Part Two',
    mainActor: 'Timothée Chalamet',
    genre: 'Sci-Fi',
    imdbRating: '8.6',
    duration: '166',
    poster: '/images/dune_parte_dos-cartel-11648.jpg',
    year: '2024',
    genres: ['Sci-Fi', 'Adventure'],
    cinema: 'IMAX',
    cinemaRating: '9.1',
  },
  {
    id: 2,
    title: 'Godzilla x Kong: The New Empire',
    mainActor: 'Rebecca Hall',
    genre: 'Action',
    imdbRating: '6.7',
    duration: '115',
    poster: '/images/godzilla_vs_kong-cartel-9765.jpg',
    year: '2024',
    genres: ['Action', 'Sci-Fi'],
    cinema: 'Cinepolis',
    cinemaRating: '7.8',
  },
  {
    id: 3,
    title: 'Kung Fu Panda 4',
    mainActor: 'Jack Black',
    genre: 'Animation',
    imdbRating: '6.4',
    duration: '94',
    poster: '/images/kung_fu_panda_4-cartel-11645.jpg',
    year: '2024',
    genres: ['Animation', 'Comedy'],
    cinema: 'Cinemex',
    cinemaRating: '7.2',
  },
  {
    id: 4,
    title: 'Civil War',
    mainActor: 'Kirsten Dunst',
    genre: 'Thriller',
    imdbRating: '7.4',
    duration: '109',
    poster: '/images/civil_war-cartel-11704.jpg',
    year: '2024',
    genres: ['Thriller', 'Action'],
    cinema: 'Cinepolis',
    cinemaRating: '8.0',
  },
  {
    id: 5,
    title: 'Cómo entrenar a tu dragón',
    mainActor: 'Jay Baruchel',
    genre: 'Animation',
    imdbRating: '8.1',
    duration: '98',
    poster: '/images/como_entrenar_a_tu_dragon-cartel-12339.jpg',
    year: '2010',
    genres: ['Animation', 'Family'],
    cinema: 'Cinemex',
    cinemaRating: '8.5',
  },
];

const Peliculas = () => {
  // Estado para paginado, selección y formulario
  const [movies, setMovies] = useState(moviesDataInit);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(moviesDataInit[0] || null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("");
  const moviesPerPage = 10;

  // Filtrado de películas
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(filter.toLowerCase()) ||
    movie.genre.toLowerCase().includes(filter.toLowerCase()) ||
    (movie.mainActor && movie.mainActor.toLowerCase().includes(filter.toLowerCase()))
  );
  // Calcular paginado
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  // Navegación Hero
  const handlePrev = () => {
    const idx = movies.findIndex(m => m.id === selectedMovie?.id);
    if (idx > 0) setSelectedMovie(movies[idx - 1]);
  };
  const handleNext = () => {
    const idx = movies.findIndex(m => m.id === selectedMovie?.id);
    if (idx < movies.length - 1) setSelectedMovie(movies[idx + 1]);
  };

  // Crear nueva película
  const handleCreateMovie = (movie) => {
    setMovies([movie, ...movies]);
    setSelectedMovie(movie);
    setCurrentPage(1);
  };

  return (
    <div className="py-12 px-4 md:px-16 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Hero movie={selectedMovie} onPrev={handlePrev} onNext={handleNext} />
      <Filtrar value={filter} onChange={e => setFilter(e.target.value)} placeholder="Buscar por título, género o actor..." />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Películas</h2>
        <button onClick={() => setShowForm(true)} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700 transition">+ Nueva Película</button>
      </div>
      <MovieGrid movies={currentMovies} onSelect={setSelectedMovie} />
      {/* Paginado */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-lg font-bold ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-blue-700'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {showForm && (
        <CrearPeliculaForm onCreate={handleCreateMovie} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Peliculas;
