import SEO from '../../components/common/SEO';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Badge from '../../components/common/Badge';
import { useContactList, useUpdateContactStatus } from '../../hooks/useContact';
import { IoMailOutline, IoCalendarOutline, IoPersonOutline } from 'react-icons/io5';

const AdminContactsPage = () => {
  const { data, isLoading } = useContactList();
  const updateStatusMutation = useUpdateContactStatus();

  const inquiries = data?.data || [];

  const handleStatusChange = (id, newStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  return (
    <>
      <SEO title="Client Inquiries | AJ Studio Admin" />

      <div className="flex min-h-screen bg-neutral-950">
        <AdminSidebar />

        <main className="flex-1 p-6 md:p-10 space-y-8 overflow-x-hidden">
          <div className="border-b border-neutral-900 pb-6">
            <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
              Client <span className="gold-gradient-text">Inquiries</span>
            </h1>
            <p className="text-xs text-neutral-400">
              Review and manage incoming booking requests and contact submissions.
            </p>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-neutral-500 text-xs">
              Loading inquiries...
            </div>
          ) : inquiries.length === 0 ? (
            <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-12 text-center space-y-2">
              <IoMailOutline className="w-10 h-10 mx-auto text-neutral-600" />
              <p className="text-sm text-neutral-300 font-semibold">No inquiries received yet.</p>
              <p className="text-xs text-neutral-500">Inquiries submitted via the Contact page will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry._id}
                  className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-4 shadow-lg hover:border-neutral-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white uppercase">{inquiry.subject}</h3>
                        <Badge
                          variant={
                            inquiry.status === 'unread'
                              ? 'gold'
                              : inquiry.status === 'replied'
                              ? 'success'
                              : 'dark'
                          }
                        >
                          {inquiry.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                        <span className="flex items-center gap-1">
                          <IoPersonOutline className="w-3.5 h-3.5 text-amber-500" />
                          {inquiry.name} ({inquiry.email})
                        </span>
                        <span className="flex items-center gap-1">
                          <IoCalendarOutline className="w-3.5 h-3.5 text-amber-500" />
                          {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-neutral-400 font-semibold uppercase">Status:</span>
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                        className="bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/70 p-4 rounded-xl border border-neutral-800/60 whitespace-pre-wrap">
                    {inquiry.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminContactsPage;
