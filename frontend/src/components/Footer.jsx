import React from 'react';

const Footer = () => (
  <footer className="bg-gradient-to-r from-indigo-700 to-purple-700 text-yellow-200 py-6 text-center mt-12 shadow-inner">
    <span className="font-semibold">&copy; {new Date().getFullYear()} CinemaHub. Todos los derechos reservados.</span>
  </footer>
);

export default Footer;