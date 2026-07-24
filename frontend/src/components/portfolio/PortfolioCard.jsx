import React from 'react';
import { motion } from 'framer-motion';

const PortfolioCard = ({ item, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      layout
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow-md transition-shadow hover:shadow-xl"
    >
      <div className="aspect-[4/5] w-full overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
          <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {item.category}
          </span>
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
          {item.location && (
            <p className="mt-1 text-sm text-gray-300">{item.location}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
