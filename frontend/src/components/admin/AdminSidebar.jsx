import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  IoSpeedometerOutline,
  IoImagesOutline,
  IoMailUnreadOutline,
  IoLogOutOutline,
  IoCameraOutline,
  IoHomeOutline,
} from 'react-icons/io5';
import { useAuth } from '../../hooks/useAuth';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, admin } = useAuth();

  const links = [
    { name: 'Dashboard & Portfolio', path: '/admin/dashboard', icon: IoImagesOutline },
    { name: 'Client Inquiries', path: '/admin/contacts', icon: IoMailUnreadOutline },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 min-h-screen flex flex-col justify-between p-6 shrink-0 hidden md:flex">
      <div className="space-y-8">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500 p-0.5 shadow-md shadow-amber-500/20">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center text-amber-400">
              <IoCameraOutline className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wider text-white uppercase gold-gradient-text">
              AJ STUDIO
            </span>
            <span className="text-[10px] tracking-widest text-amber-400 font-semibold uppercase">
              Admin Portal
            </span>
          </div>
        </Link>

        {/* User Card */}
        <div className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-bold uppercase">
            {admin?.username ? admin.username[0] : 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{admin?.username || 'Administrator'}</p>
            <p className="text-[10px] text-neutral-400">Full Access Mode</p>
          </div>
        </div>

        {/* Links */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  active
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2 pt-6 border-t border-neutral-800">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
        >
          <IoHomeOutline className="w-4 h-4" />
          View Live Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <IoLogOutOutline className="w-5 h-5" />
          Logout Session
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
