import { useState } from 'react';
import {
  IoAddOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoImagesOutline,
  IoGridOutline,
  IoMailUnreadOutline,
  IoSearchOutline,
} from 'react-icons/io5';
import SEO from '../../components/common/SEO';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import PortfolioFormModal from '../../components/admin/PortfolioFormModal';
import ConfirmModal from '../../components/common/ConfirmModal';
import {
  usePortfolioList,
  useCreatePortfolio,
  useUpdatePortfolio,
  useDeletePortfolio,
} from '../../hooks/usePortfolio';
import { useContactList } from '../../hooks/useContact';
import { CATEGORIES } from '../../constants/categories';

const AdminDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Data Queries
  const { data: portfolioData, isLoading } = usePortfolioList({
    category: activeCategory,
    search,
    page,
    limit: 20,
  });

  const { data: contactData } = useContactList();

  // Mutations
  const createMutation = useCreatePortfolio();
  const updateMutation = useUpdatePortfolio();
  const deleteMutation = useDeletePortfolio();

  const portfolioItems = portfolioData?.data || [];
  const totalImages = portfolioData?.totalDocuments || 0;
  const totalInquiries = contactData?.count || 0;

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingItem) {
      updateMutation.mutate(
        { id: editingItem._id, data: formData },
        {
          onSuccess: () => setIsFormOpen(false),
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setIsFormOpen(false),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingId) return;
    deleteMutation.mutate(deletingId, {
      onSuccess: () => setDeletingId(null),
    });
  };

  return (
    <>
      <SEO title="Admin Portfolio Management | AJ Studio" />

      <div className="flex min-h-screen bg-neutral-950">
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Dashboard Main Content */}
        <main className="flex-1 p-6 md:p-10 space-y-8 overflow-x-hidden">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
                Portfolio <span className="gold-gradient-text">Management</span>
              </h1>
              <p className="text-xs text-neutral-400">
                Manage, add, edit, and organize all photography portfolio items.
              </p>
            </div>
            <Button variant="gold" onClick={handleOpenAdd} className="flex items-center gap-2">
              <IoAddOutline className="w-5 h-5" />
              Add New Photograph
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Total Images
                </p>
                <h3 className="text-2xl font-bold text-white">{totalImages}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <IoImagesOutline className="w-6 h-6" />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Total Categories
                </p>
                <h3 className="text-2xl font-bold text-white">{CATEGORIES.length - 1}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <IoGridOutline className="w-6 h-6" />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Client Inquiries
                </p>
                <h3 className="text-2xl font-bold text-white">{totalInquiries}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <IoMailUnreadOutline className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Filters & Search Controls */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Select */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <IoSearchOutline className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search images..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-neutral-950 text-xs text-neutral-100 placeholder-neutral-500 rounded-lg pl-9 pr-4 py-2.5 border border-neutral-800 focus:outline-none focus:border-amber-500/80"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-950 text-neutral-400 font-bold uppercase tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="py-4 px-6">Image</th>
                    <th className="py-4 px-6">Title</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-neutral-500">
                        Loading portfolio items...
                      </td>
                    </tr>
                  ) : portfolioItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-neutral-400">
                        No portfolio items found matching query criteria.
                      </td>
                    </tr>
                  ) : (
                    portfolioItems.map((item) => (
                      <tr key={item._id} className="hover:bg-neutral-800/40 transition-colors">
                        {/* Thumbnail */}
                        <td className="py-3 px-6">
                          <div className="w-14 h-10 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>

                        {/* Title */}
                        <td className="py-3 px-6 font-semibold text-white">
                          {item.title}
                        </td>

                        {/* Category */}
                        <td className="py-3 px-6">
                          <Badge variant="gold">{item.category}</Badge>
                        </td>

                        {/* Date */}
                        <td className="py-3 px-6 text-neutral-400">
                          {item.date || item.createdAt?.split('T')[0]}
                        </td>

                        {/* Location */}
                        <td className="py-3 px-6 text-neutral-400">
                          {item.location || 'N/A'}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-6 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-300 transition-colors"
                            title="Edit Item"
                          >
                            <IoPencilOutline className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingId(item._id)}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-rose-600 hover:text-white text-neutral-300 transition-colors"
                            title="Delete Item"
                          >
                            <IoTrashOutline className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Form Modal (Add / Edit) */}
      <PortfolioFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

export default AdminDashboard;
