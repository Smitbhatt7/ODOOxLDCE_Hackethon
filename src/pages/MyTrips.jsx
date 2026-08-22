import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../store/appStore';
import { Calendar, MapPin, MoreVertical, Trash2, Edit3, Share, Copy } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export default function MyTrips() {
  const { trips, deleteTrip, copyTrip } = useAppContext();
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(id);
    }
    setActiveMenu(null);
  };

  const handleCopy = (trip, e) => {
    e.preventDefault();
    e.stopPropagation();
    copyTrip(trip);
    setActiveMenu(null);
  };

  const ongoingTrips = trips.filter(t => new Date(t.startDate) <= new Date() && new Date(t.endDate) >= new Date(new Date().setHours(0,0,0,0)));
  const upcomingTrips = trips.filter(t => new Date(t.startDate) > new Date());
  const completedTrips = trips.filter(t => new Date(t.endDate) < new Date(new Date().setHours(0,0,0,0)));

  const renderTripGroup = (title, groupTrips) => {
    if (groupTrips.length === 0) return null;
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groupTrips.map(trip => {
            const days = Math.max(1, differenceInDays(new Date(trip.endDate), new Date(trip.startDate)));
            
            return (
              <Link key={trip.id} to={`/trips/${trip.id}/builder`} className="group block relative">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 transition-all hover:shadow-lg flex flex-col h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={trip.coverImage || 'https://images.unsplash.com/photo-1488646953014-c8c3629fca1f'} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    
                    <button 
                      onClick={(e) => toggleMenu(trip.id, e)}
                      className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors z-20"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {activeMenu === trip.id && (
                      <div className="absolute top-14 right-3 bg-white rounded-xl shadow-xl py-2 w-48 z-30 border border-slate-100" onClick={e => e.preventDefault()}>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                          <Edit3 className="w-4 h-4" /> Edit Details
                        </button>
                        <button onClick={(e) => handleCopy(trip, e)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                          <Copy className="w-4 h-4" /> Duplicate Trip
                        </button>
                        <Link to={`/share/${trip.id}`} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                          <Share className="w-4 h-4" /> Share Trip
                        </Link>
                        <div className="h-px bg-slate-100 my-1" />
                        <button onClick={(e) => handleDelete(trip.id, e)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Delete Trip
                        </button>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-5 right-5 text-white pointer-events-none">
                      <h3 className="text-2xl font-display font-bold mb-1 leading-tight">{trip.name}</h3>
                      <p className="text-sm text-slate-200">{format(new Date(trip.startDate), 'MMM dd')} — {format(new Date(trip.endDate), 'MMM dd, yyyy')}</p>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full"><MapPin className="w-4 h-4 text-brand-500" /> {trip.stops?.length || 0} cities</span>
                      <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full"><Calendar className="w-4 h-4 text-brand-500" /> {days} days</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <span className="text-brand-600 font-medium text-sm flex items-center gap-1 hover:text-brand-700">Continue Planning &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">My Trips</h1>
          <p className="text-xl text-slate-500 font-light">Your past, present, and future adventures.</p>
        </div>
        <Link to="/trips/new" className="hidden sm:inline-flex bg-brand-600 text-white px-6 py-3 rounded-full font-medium hover:bg-brand-700 transition-colors">
          + Plan New Trip
        </Link>
      </div>

      {trips.length > 0 ? (
        <>
          {renderTripGroup("Ongoing Trips", ongoingTrips)}
          {renderTripGroup("Upcoming Trips", upcomingTrips)}
          {renderTripGroup("Completed Trips", completedTrips)}
        </>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
          <div className="bg-brand-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-brand-500" />
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">Your next adventure starts here.</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">Create your first trip to start building itineraries, exploring destinations, and managing budgets.</p>
          <Link to="/trips/new" className="inline-flex bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-800 transition-colors text-lg">
            Create your first trip
          </Link>
        </div>
      )}
    </div>
  );
}
