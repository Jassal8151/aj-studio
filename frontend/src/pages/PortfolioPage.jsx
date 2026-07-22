import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBack, IoChevronForward, IoImageOutline } from 'react-icons/io5';
import SEO from '../components/common/SEO';
import PortfolioCard from '../components/portfolio/PortfolioCard';
import PortfolioFilter from '../components/portfolio/PortfolioFilter';
import PortfolioSort from '../components/portfolio/PortfolioSort';
import LightboxModal from '../components/common/LightboxModal';
import { usePortfolioList } from '../hooks/usePortfolio';
import { CardSkeleton } from '../components/common/LoadingSpinner';

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const limit = 12;

  const { data, isLoading, isError } = usePortfolioList({
    category: activeCategory,
    sort,
    search,
    page,
    limit,
  });

  const portfolioItems = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const totalDocuments = data?.totalDocuments || 0;

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setPage(1);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1);
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    setPage(1);
  };

  return (
    <>
      <SEO
        title="Portfolio Gallery | AJ Studio Photography"
        description="Browse our fine art photography gallery including weddings, editorial portraits, wildlife, travel, fashion, and product photography."
      />

      {/* Header Banner */}
      <div className="bg-neutral-900/60 border-b border-neutral-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
            Visual Archive
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
            Portfolio <span className="gold-gradient-text">Gallery</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Explore our curated portfolio of fine art photographs across various genres and international locations.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-12 bg-neutral-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Controls Bar (Filter + Sort/Search) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-900">
            <PortfolioFilter
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
            <PortfolioSort
              sort={sort}
              onSortChange={handleSortChange}
              search={search}
              onSearchChange={handleSearchChange}
            />
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>
              Showing {portfolioItems.length} of {totalDocuments} photographs
            </span>
            {activeCategory !== 'All' && (
              <span className="text-amber-400">Filtered by: {activeCategory}</span>
            )}
          </div>

          {/* Grid or Empty State */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-16 space-y-3 bg-neutral-900/40 rounded-2xl border border-neutral-800">
              <p className="text-rose-400 font-semibold">Failed to load portfolio items.</p>
              <p className="text-xs text-neutral-500">Please check your database connection or try again.</p>
            </div>
          ) : portfolioItems.length === 0 ? (
            <div className="text-center py-20 space-y-4 bg-neutral-900/30 rounded-2xl border border-neutral-800">
              <div className="w-16 h-16 mx-auto rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500">
                <IoImageOutline className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-white">No photographs found</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                No image match the selected category or search filter. Try clearing filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearch('');
                }}
                className="text-xs uppercase tracking-wider text-amber-400 font-semibold hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${sort}-${page}-${search}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {portfolioItems.map((item, idx) => (
                  <PortfolioCard
                    key={item._id}
                    item={item}
                    onClick={() => setLightboxIndex(idx)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-8 border-t border-neutral-900">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous Page"
              >
                <IoChevronBack className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5">
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  const isCurrent = pageNum === page;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-9 h-9 text-xs font-semibold rounded-lg transition-all ${
                        isCurrent
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next Page"
              >
                <IoChevronForward className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <LightboxModal
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={portfolioItems}
        index={lightboxIndex}
      />
    </>
  );
};

export default PortfolioPage;
