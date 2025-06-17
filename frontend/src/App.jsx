import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Peliculas from './pages/Peliculas';
import Actores from './pages/Actores';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Navigate to="/peliculas" />} />
            <Route path="/peliculas" element={<><Hero /><Peliculas /></>} />
            <Route path="/actores" element={<Actores />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
