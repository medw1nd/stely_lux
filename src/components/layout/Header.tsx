import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Головна', href: '#home' },
  { name: 'Переваги', href: '#features' },
  { name: 'Матеріали', href: '#materials' },
  { name: 'Роботи', href: '#portfolio' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      if (href === '#home') {
        navigate('/');
      } else {
        navigate('/' + href);
      }
      return;
    }

    if (href === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    // 1. FIXED + Z-INDEX 100: Хедер всегда сверху
    // 2. POINTER-EVENTS-NONE: Сам контейнер пропускает клики сквозь себя
    <nav className={`fixed top-0 left-0 right-0 z-[100] w-full h-16 lg:h-20 pointer-events-none transition-all duration-300 ${isScrolled ? 'bg-black/20 backdrop-blur-lg' : 'bg-transparent'}`}>
      <div className="w-full h-full px-4 md:px-6 lg:px-20 py-2">
        <div className="flex items-center justify-between h-full flex-row-reverse lg:flex-row">

          {/* ЛЕВАЯ ЧАСТЬ (ЛОГОТИП) */}
          <div className="flex items-center gap-2 pointer-events-auto"> {/* Включаем клики для детей */}
            <button
              onClick={(e) => handleScrollTo(e, '#home')}
              className="flex items-center gap-2 shrink-0 group focus:outline-none"
            >
              <img
                src="/logo.png"
                alt="Steli Lux Logo"
                className="h-9 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </div>

          {/* ПРАВАЯ ЧАСТЬ - DESKTOP */}
          <div className="hidden lg:flex items-center gap-10 pointer-events-auto"> {/* Включаем клики */}
            <div className="flex items-center gap-8 transition-all duration-300">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e as any, link.href)}
                  className="text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <a
              href="tel:+380977347767"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 border border-orange-400/50 transition-all hover:border-orange-300 group cursor-pointer shadow-lg shadow-orange-500/20"
            >
              <Phone className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-white">
                +380 97 734 77 67
              </span>
            </a>
          </div>

          {/* МОБИЛЬНАЯ КНОПКА МЕНЮ */}
          <div className="lg:hidden flex items-center pointer-events-auto shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>

      {/* Затемнення фону */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* МОБИЛЬНОЕ МЕНЮ (Сайдбар зліва) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 left-0 h-[100dvh] w-[80vw] max-w-[320px] bg-[#121212]/95 backdrop-blur-xl border-r border-white/10 shadow-2xl z-[101] pointer-events-auto lg:hidden flex flex-col"
          >
            {/* Header of sidebar */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/10 shrink-0">
              <span className="text-white font-bold text-xl tracking-widest uppercase">Меню</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2 p-4 overflow-y-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e as any, link.href)}
                  className="w-full flex items-center px-4 py-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="mx-4 my-4 border-t border-white/5 shrink-0" />

              <div className="px-4 shrink-0 pb-8">
                <a
                  href="tel:+380977347767"
                  className="w-full flex justify-center items-center gap-2 px-5 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 transition-colors text-white font-bold"
                >
                  <Phone className="w-5 h-5" />
                  <span>097 734 77 67</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;