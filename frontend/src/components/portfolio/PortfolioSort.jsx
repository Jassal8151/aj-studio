import { IoSearchOutline, IoSwapVerticalOutline } from 'react-icons/io5';

const PortfolioSort = ({ sort, onSortChange, search, onSearchChange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
          <IoSearchOutline className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, location..."
          className="w-full bg-neutral-900 text-xs text-neutral-100 placeholder-neutral-500 rounded-lg pl-9 pr-4 py-2.5 border border-neutral-800 focus:outline-none focus:border-amber-500/80 transition-all"
        />
      </div>

      {/* Sort Select */}
      <div className="relative w-full sm:w-44">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
          <IoSwapVerticalOutline className="w-4 h-4" />
        </div>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-neutral-900 text-xs text-neutral-200 rounded-lg pl-9 pr-8 py-2.5 border border-neutral-800 focus:outline-none focus:border-amber-500/80 transition-all appearance-none cursor-pointer"
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSort;
