import React from 'react';
import { CATEGORIES } from '../../constants/categories';

const PortfolioFilter = ({ activeCategory, onCategoryChange }) => {
  const allCategories = ['All', ...CATEGORIES];

  return (
    <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-black text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-black shadow-sm border border-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default PortfolioFilter;
