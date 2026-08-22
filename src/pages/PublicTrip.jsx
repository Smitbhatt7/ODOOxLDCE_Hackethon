import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/appStore';
import { MapPin, Calendar, Clock, Tag, Copy, Plane } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export default function PublicTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips, cities, activities, user, copyTrip } = useAppContext();
  
  const [trip, setTrip] = useState(null);
  
  useEffect(() => {
    // In a real app, this would fetch from a public endpoint
    // Here we just look it up in local state
    const t = trips.find(t => t.id === id);
    if (t) setTrip(t);
  }, [id, trips]);

  if (!trip) {
    return <div className="min-h-screen flex items-center justify-center">Trip not found</div>;
  }

  const tripDays = Math.max(1, differenceInDays(new Date(trip.endDate), new Date(trip.startDate)));

  const handleCopyTrip = () => {
    if (!user) {
      alert("Please log in to copy trips.");
      navigate('/login');
      return;
    }
    const newTrip = copyTrip(trip);
    navigate(`/trips/${newTrip.id}/builder`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Readonly Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-600 p-1.5 rounded-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 tracking-tight">GlobeTrotter</span>
          </Link>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied!");
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-medium transition-colors"
            >
              Copy Link
            </button>
            <button 
              onClick={handleCopyTrip}
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-full text-sm font-medium transition-colors"
            >
              <Copy className="w-4 h-4" /> Copy Trip
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="h-64 relative">
            <img src={trip.coverImage} alt={trip.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h1 className="text-5xl font-display font-bold mb-2">{trip.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-lg opacity-90">
                <span className="flex items-center gap-2"><Calendar className="w-5 h-5" /> {format(new Date(trip.startDate), 'MMM dd')} — {format(new Date(trip.endDate), 'MMM dd, yyyy')}</span>
                <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {trip.stops.length} cities</span>
                <span>{tripDays} Days</span>
              </div>
            </div>
          </div>
          {trip.description && (
            <div className="p-8 text-lg text-slate-700 border-b border-slate-100">
              {trip.description}
            </div>
          )}
        </div>

        <div className="space-y-16 pb-16">
          {trip.stops.map((stop, index) => {
            const city = cities.find(c => c.id === stop.cityId);
            return (
              <div key={stop.id} className="relative pl-8 md:pl-0">
                {/* Timeline connector */}
                {index !== trip.stops.length - 1 && (
                  <div className="absolute left-8 md:left-[50%] top-24 bottom-[-64px] w-0.5 bg-slate-200 -translate-x-1/2 z-0 hidden md:block" />
                )}
                
                <div className="md:grid md:grid-cols-2 md:gap-12 relative z-10">
                  {/* City Info - Left on desktop */}
                  <div className="md:text-right mb-8 md:mb-0 relative">
                    <div className="hidden md:block absolute md:-right-[30px] top-2 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-slate-50 md:translate-x-1/2" />
                    
                    <h2 className="text-4xl font-display font-bold text-slate-900 mb-2">{city?.name}</h2>
                    <p className="text-brand-600 font-medium text-lg mb-4">
                      {format(new Date(stop.startDate), 'MMMM do')} — {format(new Date(stop.endDate), 'MMMM do')}
                    </p>
                    <img src={city?.image} alt={city?.name} className="w-full md:w-3/4 md:ml-auto aspect-[4/3] object-cover rounded-2xl shadow-sm" />
                  </div>

                  {/* Activities - Right on desktop */}
                  <div className="space-y-6">
                    {stop.activities.length === 0 ? (
                      <p className="text-slate-500 italic">Exploring the city freely.</p>
                    ) : (
                      [...stop.activities].sort((a, b) => a.time.localeCompare(b.time)).map((tripAct) => {
                        const activity = activities.find(a => a.id === tripAct.activityId);
                        return (
                          <div key={tripAct.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-lg text-sm">{tripAct.time}</span>
                              <span className="text-brand-600 font-medium text-sm flex items-center gap-1"><Clock className="w-4 h-4"/> {activity?.duration}h</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{activity?.name}</h3>
                            <p className="text-slate-600 mb-4">{activity?.description}</p>
                            <div className="flex items-center gap-3 text-sm">
                              <span className="flex items-center gap-1 text-slate-500"><Tag className="w-4 h-4"/> {activity?.category}</span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
