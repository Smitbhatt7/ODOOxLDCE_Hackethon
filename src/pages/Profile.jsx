import { useAppContext } from '../store/appStore';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 w-full">
      <h1 className="text-4xl font-display font-bold text-slate-900 mb-8">Profile</h1>
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
            <img src={user?.profileImage} alt={user?.name} className="w-32 h-32 rounded-full border-4 border-slate-100" />
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-slate-900 mb-1">{user?.name}</h2>
                <p className="text-slate-500 mb-4">{user?.email}</p>
                <button className="text-brand-600 font-medium hover:text-brand-700 text-sm">Edit Profile Information</button>
            </div>
        </div>
        <button onClick={handleLogout} className="mt-6 md:mt-0 flex items-center gap-2 text-red-600 font-medium hover:bg-red-50 px-6 py-3 rounded-full transition-colors border border-red-200">
          <LogOut className="w-5 h-5" /> Sign out
        </button>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Preferred Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-200 flex items-center justify-center bg-slate-50 hover:bg-slate-100">
                <span className="text-slate-500 font-medium">+ Add Destination</span>
            </div>
            {/* Mock preferred destination */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-200">
                <img src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80" alt="Tokyo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold text-lg">Tokyo</h4>
                </div>
            </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Previous Trips</h2>
        <div className="text-slate-500 bg-white p-8 rounded-2xl border border-slate-200 text-center">
            No previous trips completed yet.
        </div>
      </div>
    </div>
  );
}
