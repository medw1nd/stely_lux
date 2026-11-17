import React from 'react';
import { PORTFOLIO_ITEMS } from '../../config/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Portfolio: React.FC = () => {
  const displayedItems = PORTFOLIO_ITEMS.slice(0, 3);

  return (
    <section id="portfolio" className="py-24 bg-brand-gray">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
              Наші <span className="text-brand-orange">Роботи</span>
            </h2>
            <div className="w-20 h-1 bg-brand-orange rounded-full mb-4"></div>
            <p className="text-gray-600">
              Реальні фото наших об'єктів в Івано-Франківську та області.
            </p>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-lg bg-white h-72"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  style={item.presentation && {
                    objectPosition: item.presentation.position,
                    filter: `brightness(${item.presentation.brightness}) saturate(0.94)`
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {PORTFOLIO_ITEMS.length > 3 && (
          <motion.div layout className="mt-12 flex justify-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 transform hover:-translate-y-1"
            >
              Переглянути більше робіт
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
