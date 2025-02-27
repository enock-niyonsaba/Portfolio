import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X, Shield } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/contact', label: 'Contact' },
    { path: '/admin', label: 'Admin', icon: Shield }
  ];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${
      scrolled ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Code2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:rotate-180" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Enock NIYONSABA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive(item.path)
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`sm:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64' : 'max-h-0'} overflow-hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive(item.path)
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-gray-700'
                  : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;