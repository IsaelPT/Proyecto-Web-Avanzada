import React, { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import Hero from '../components/Hero';
import CrearPeliculaForm from '../components/CrearPeliculaForm';
import Filtrar from '../components/Filtrar';
import { getMoviesActors } from '../helpers/gets';
import { getMoviesActorsFiltered } from '../helpers/filter';

const Peliculas = () => {
  // Estado para paginado, selección y formulario
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("");
  const moviesPerPage = 10;

  // Inicializar moviesDataInit usando getMoviesActors
  useEffect(() => {
    const fetchMoviesActors = async () => {
      const data = await getMoviesActors();
      setMovies(data || []);
      setSelectedMovie((data && data[0]) || null);
    };
    fetchMoviesActors();
  }, []);

  // Filtrado de películas usando la API
  useEffect(() => {
    const fetchFilteredMovies = async () => {
      if (filter.trim() === "") {
        const data = await getMoviesActors();
        setMovies(data || []);
      } else {
        const filtered = await getMoviesActorsFiltered(filter);
        setMovies(filtered || []);
      }
    };
    fetchFilteredMovies();
  }, [filter]);

  // Calcular paginado
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

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
