import React, { useEffect } from 'react';
import { PORTFOLIO_ITEMS } from '../config/constants';
import { motion } from 'framer-motion';

const PortfolioPage: React.FC = () => {
    useEffect(() => {
        // Scroll to top when page opens
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="py-24 bg-brand-gray min-h-screen">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
                        Всі <span className="text-brand-orange">роботи</span>
                    </h1>
                    <div className="w-20 h-1 bg-brand-orange rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Ознайомтеся з повним портфоліо наших натяжних стель в Івано-Франківську та області.
                    </p>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PORTFOLIO_ITEMS.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
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
                </motion.div>
            </div>
        </div>
    );
};

export default PortfolioPage;
