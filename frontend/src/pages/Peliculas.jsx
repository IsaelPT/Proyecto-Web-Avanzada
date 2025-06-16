import React, { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import Hero from '../components/Hero';
import CrearPeliculaForm from '../components/CrearPeliculaForm';
import Filtrar from '../components/Filtrar';
import Modal from '../components/Modal';
import EditarPeliculaForm from '../components/EditarPeliculaForm';
import { getMoviesActors } from '../helpers/gets';
import { getMoviesActorsFiltered } from '../helpers/filter';
import { deleteMovie } from '../helpers/movieActions';

const Peliculas = () => {
  // Estado para paginado, selección y formulario
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("");
  const [editMovie, setEditMovie] = useState(null);
  const [deleteMovieId, setDeleteMovieId] = useState(null);
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

  const handleUpdateMovie = async (updatedMovieActor) => {
    // Recargar la lista completa desde la API
    const data = await getMoviesActors();
    setMovies(data || []);
    // Seleccionar el movie_actor actualizado
    const selected = (data || []).find(m => m.movie_id === updatedMovieActor.movie_id) || null;
    setSelectedMovie(selected);
  };

  const handleDeleteMovie = async (id) => {
    const ok = await deleteMovie(id);
    if (ok) {
      const newMovies = movies.filter(m => m.id !== id);
      setMovies(newMovies);
      setSelectedMovie(newMovies[0] || null);
    }
    setDeleteMovieId(null);
  };

  return (
    <div className="py-12 px-4 md:px-16 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Hero 
        movie={selectedMovie} 
        onPrev={handlePrev} 
        onNext={handleNext} 
        onEdit={() => setEditMovie(selectedMovie)} 
        onDelete={() => setDeleteMovieId(selectedMovie?.id)} 
      />
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
      {editMovie && (
        <Modal isOpen={!!editMovie} onClose={() => setEditMovie(null)}>
          <EditarPeliculaForm 
            movie={editMovie} 
            movieActors={movies} 
            onUpdate={handleUpdateMovie} 
            onClose={() => setEditMovie(null)} 
          />
        </Modal>
      )}
      {deleteMovieId && (
        <Modal isOpen={!!deleteMovieId} onClose={() => setDeleteMovieId(null)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">¿Eliminar película?</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteMovieId(null)} className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">Cancelar</button>
              <button onClick={() => handleDeleteMovie(deleteMovieId)} className="px-5 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">Eliminar</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Peliculas;
