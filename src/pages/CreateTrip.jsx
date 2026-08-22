import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/appStore';
import { Calendar as CalendarIcon, Map, Info } from 'lucide-react';
import { differenceInDays, format, isValid, parseISO } from 'date-fns';

export default function CreateTrip() {
  const navigate = useNavigate();
  const { addTrip } = useAppContext();

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const [theme, setTheme] = useState('Relaxation');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !startDate || !endDate) return;

    const newTrip = addTrip({
      name,
      startDate,
      endDate,
      description,
      theme,
      coverImage: 'https://picsum.photos/seed/newtrip/1600/900', // Default cover
    });

    navigate(`/trips/${newTrip.id}/builder`);
  };

  const days = startDate && endDate && isValid(parseISO(startDate)) && isValid(parseISO(endDate))
    ? Math.max(1, differenceInDays(parseISO(endDate), parseISO(startDate)))
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex gap-8 flex-col lg:flex-row">
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden h-fit">
        <div className="h-48 bg-slate-900 relative">
          <img src="https://picsum.photos/seed/newtrip/1600/900" alt="Cover" className="w-full h-full object-cover opacity-60" />
          <div className="absolute bottom-6 left-8 text-white">
            <h1 className="text-3xl font-display font-bold">Plan a New Trip</h1>
            <p className="opacity-90">Start your next great adventure.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Trip Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-lg font-medium"
              placeholder="e.g. European Summer 2024"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Select a Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="Relaxation">Relaxation</option>
              <option value="Adventure">Adventure</option>
              <option value="Culture">Culture</option>
              <option value="Food & Drink">Food & Drink</option>
              <option value="Nature">Nature</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {days > 0 && (
            <div className="bg-brand-50 rounded-xl p-4 flex items-start gap-3 text-brand-800">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Awesome, that's {days} days of travel!</p>
                <p className="text-sm opacity-90">Next, we'll help you pick cities and build your itinerary day by day.</p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent min-h-[100px]"
              placeholder="What's the vibe for this trip?"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-full font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors flex items-center gap-2"
            >
              Start Building <Map className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Suggestions Panel */}
      <div className="w-full lg:w-80 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Suggestions based on {theme}</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative">
            <img src="https://picsum.photos/seed/paris/400/400" className="w-full h-full object-cover" alt="Paris" />
            <div className="absolute inset-0 bg-black/30 flex items-end p-2"><span className="text-white text-sm font-bold">Paris</span></div>
          </div>
          <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative">
            <img src="https://picsum.photos/seed/bali/400/400" className="w-full h-full object-cover" alt="Bali" />
            <div className="absolute inset-0 bg-black/30 flex items-end p-2"><span className="text-white text-sm font-bold">Bali</span></div>
          </div>
          <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative">
            <img src="https://picsum.photos/seed/kyoto/400/400" className="w-full h-full object-cover" alt="Kyoto" />
            <div className="absolute inset-0 bg-black/30 flex items-end p-2"><span className="text-white text-sm font-bold">Kyoto</span></div>
          </div>
          <div className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative">
            <img src="https://picsum.photos/seed/rome/400/400" className="w-full h-full object-cover" alt="Rome" />
            <div className="absolute inset-0 bg-black/30 flex items-end p-2"><span className="text-white text-sm font-bold">Rome</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
