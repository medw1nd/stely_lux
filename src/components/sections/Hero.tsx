import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const handleScrollToPortfolio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Ceiling Interior"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30"></div>
        {/* Top blur overlay matching header height */}
        <div className="absolute top-0 left-0 right-0 h-20 lg:h-24 backdrop-blur-md bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-block px-4 py-1.5 mb-6 border border-brand-orange/50 rounded-full bg-brand-dark/50 backdrop-blur-sm">
            <span className="text-brand-orange font-bold text-sm tracking-wider uppercase">Івано-Франківськ та область</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Натяжні стелі <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
              Івано-Франківськ
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
            Створіть ідеальний інтер'єр з професіоналами. Європейські матеріали, безпечний монтаж та офіційна гарантія.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#portfolio"
              onClick={handleScrollToPortfolio}
              className="px-8 py-4 bg-brand-orange text-white rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 transition-transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              Дивитись роботи
              <ChevronRight size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decor Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;