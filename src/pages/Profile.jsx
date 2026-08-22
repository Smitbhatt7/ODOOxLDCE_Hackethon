import { useAppContext } from '../store/appStore';
import { LogOut, X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Profile() {
  const { user, logout, cities } = useAppContext();
  const navigate = useNavigate();

  const [preferredDestinations, setPreferredDestinations] = useState([
    { id: 'mock-1', name: 'Tokyo', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80' }
  ]);
  const [showCitySearch, setShowCitySearch] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddDestination = (city) => {
    if (!preferredDestinations.find(d => d.name === city.name)) {
      setPreferredDestinations([...preferredDestinations, city]);
    }
    setShowCitySearch(false);
  };

  const handleRemoveDestination = (id) => {
    setPreferredDestinations(preferredDestinations.filter(d => d.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 w-full relative">
      <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-8">Profile</h1>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
            <img src={user?.profileImage || user?.avatar} alt={user?.name} className="w-32 h-32 rounded-full border-4 border-slate-100 dark:border-slate-700 bg-slate-200" />
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{user?.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-4">{user?.email}</p>
                <button className="text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300 text-sm">Edit Profile Information</button>
            </div>
        </div>
        <button onClick={handleLogout} className="mt-6 md:mt-0 flex items-center gap-2 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 px-6 py-3 rounded-full transition-colors border border-red-200 dark:border-red-800/50">
          <LogOut className="w-5 h-5" /> Sign out
        </button>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">Preferred Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              onClick={() => setShowCitySearch(true)}
              className="aspect-[4/5] rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <span className="text-slate-500 dark:text-slate-400 font-medium flex flex-col items-center gap-2">
                  <span className="text-2xl">+</span> Add Destination
                </span>
            </div>
            
            {preferredDestinations.map((dest) => (
              <div key={dest.id} className="aspect-[4/5] rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-200 dark:border-slate-700">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="font-bold text-lg">{dest.name}</h4>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleRemoveDestination(dest.id); }}
                    className="absolute top-3 right-3 bg-black/40 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">Previous Trips</h2>
        <div className="text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
            No previous trips completed yet.
        </div>
      </div>

      {showCitySearch && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Select a Destination</h2>
              <button onClick={() => setShowCitySearch(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search cities, countries..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow text-lg text-slate-900 dark:text-white placeholder-slate-400"
                  value={citySearchQuery}
                  onChange={(e) => setCitySearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cities.filter(c => c.name.toLowerCase().includes(citySearchQuery.toLowerCase()) || c.country.toLowerCase().includes(citySearchQuery.toLowerCase())).map(city => (
                  <div key={city.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col hover:border-brand-300 dark:hover:border-brand-500 transition-colors cursor-pointer" onClick={() => handleAddDestination(city)}>
                    <img src={city.image} alt={city.name} className="w-full h-32 object-cover" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{city.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{city.country}</p>
                      </div>
                      <div className="w-full py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-medium transition-colors text-center">
                        Select
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
