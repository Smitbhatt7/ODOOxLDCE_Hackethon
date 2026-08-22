import { Link } from 'react-router-dom';
import { useAppContext } from '../store/appStore';
import { MapPin, Calendar, Heart, MessageCircle, Share2, Search } from 'lucide-react';
import { format } from 'date-fns';

export default function CommunityHub() {
  const { trips } = useAppContext();

  // Fake community feed using our demo trips but acting like they belong to others
  const feed = [
    { ...trips[0], author: 'Sarah Jenkins', likes: 124, comments: 12 },
    {
      id: 'mock-comm-1',
      name: 'Backpacking Southeast Asia',
      author: 'David Chen',
      coverImage: 'https://picsum.photos/seed/asia/800/600',
      stops: [1, 2, 3, 4],
      startDate: '2024-10-01',
      endDate: '2024-10-21',
      likes: 342,
      comments: 45
    },
    {
      id: 'mock-comm-2',
      name: 'Winter in the Alps',
      author: 'Emma Wilson',
      coverImage: 'https://picsum.photos/seed/alps/800/600',
      stops: [1, 2],
      startDate: '2024-12-15',
      endDate: '2024-12-25',
      likes: 89,
      comments: 8
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">Community Hub</h1>
          <p className="text-xl text-slate-500 font-light">Get inspired by itineraries from fellow travelers.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-full border border-slate-200 shadow-sm flex gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search community trips..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
          />
        </div>
        <button className="bg-brand-600 text-white px-8 py-3 rounded-full font-medium hover:bg-brand-700 transition-colors">
          Search
        </button>
      </div>

      <div className="space-y-8">
        {feed.map((trip, idx) => (
          <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6 flex items-center gap-4 border-b border-slate-100">
              <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${trip.author}`} alt={trip.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{trip.author}</h3>
                <p className="text-sm text-slate-500">Shared a public itinerary</p>
              </div>
            </div>

            <div className="h-72 relative group cursor-pointer">
              <img src={trip.coverImage || 'https://picsum.photos/seed/trip/800/600'} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-3xl font-display font-bold mb-2">{trip.name}</h2>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {trip.stops?.length || 0} stops</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {format(new Date(trip.startDate), 'MMM yyyy')}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 flex items-center justify-between">
              <div className="flex gap-6">
                <button className="flex items-center gap-2 text-slate-600 hover:text-brand-600 transition-colors font-medium">
                  <Heart className="w-5 h-5" /> {trip.likes}
                </button>
                <button className="flex items-center gap-2 text-slate-600 hover:text-brand-600 transition-colors font-medium">
                  <MessageCircle className="w-5 h-5" /> {trip.comments}
                </button>
                <button className="flex items-center gap-2 text-slate-600 hover:text-brand-600 transition-colors font-medium">
                  <Share2 className="w-5 h-5" /> Share
                </button>
              </div>

              <Link to={`/share/${trip.id}`} className="px-6 py-2 bg-white border border-slate-200 rounded-full font-medium text-slate-700 hover:border-brand-300 transition-colors">
                View Itinerary
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
