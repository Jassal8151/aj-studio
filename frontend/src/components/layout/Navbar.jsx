import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { admin } = useAuthContext();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-white/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className={`text-2xl font-bold tracking-tighter ${isScrolled || !isHomePage ? 'text-black' : 'text-white'}`}>
              AJ STUDIO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:opacity-70 ${
                  location.pathname === link.path 
                    ? (isScrolled || !isHomePage ? 'text-black font-semibold' : 'text-white font-semibold')
                    : (isScrolled || !isHomePage ? 'text-gray-600' : 'text-gray-300')
                }`}
              >
                {link.name}
              </Link>
            ))}
            {admin && (
              <Link
                to="/admin/dashboard"
                className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 ${isScrolled || !isHomePage ? 'text-black' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white md:hidden shadow-lg border-t"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium ${
                    location.pathname === link.path ? 'text-black' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {admin && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 rounded-md bg-black px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
