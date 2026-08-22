import { Link, useLocation } from 'react-router-dom';
import { Plane, Compass, Map, User, BarChart2 } from 'lucide-react';
import { useAppContext } from '../store/appStore';
import clsx from 'clsx';

export default function Navbar() {
  const { user } = useAppContext();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Compass className="w-5 h-5" /> },
    { name: 'My Trips', path: '/trips', icon: <Map className="w-5 h-5" /> },
    { name: 'Community', path: '/community', icon: <Compass className="w-5 h-5" /> },
    ...(user?.role === 'admin' ? [{ name: 'Admin', path: '/admin', icon: <BarChart2 className="w-5 h-5" /> }] : []),
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-600 p-1.5 rounded-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 tracking-tight">GlobeTrotter</span>
          </Link>

          <nav className="hidden md:flex gap-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-brand-600",
                  location.pathname === item.path ? "text-brand-600" : "text-slate-600"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/trips/new" className="hidden md:flex bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              + Plan New Trip
            </Link>
            <Link to="/profile" className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300 block">
              <img src={user?.profileImage} alt={user?.name} className="w-full h-full object-cover" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
