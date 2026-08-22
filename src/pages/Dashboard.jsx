import { Link } from 'react-router-dom';
import { useAppContext } from '../store/appStore';
import { Calendar, MapPin, ArrowRight, Wallet } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export default function Dashboard() {
  const { user, trips, cities } = useAppContext();

  const upcomingTrips = trips.filter(t => new Date(t.startDate) >= new Date(new Date().setHours(0, 0, 0, 0))).slice(0, 2);
  const recommendedCities = cities.slice(0, 4);

  // Rough estimation logic for dashboard
  const nextTrip = upcomingTrips[0];
  const nextTripCost = nextTrip ? nextTrip.stops.reduce((acc, stop) => {
    return acc + stop.activities.reduce((sum, act) => sum + act.customCost, 0) + 20000;
  }, 0) : 0;
  const nextTripDays = nextTrip ? differenceInDays(new Date(nextTrip.endDate), new Date(nextTrip.startDate)) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">Good morning, {user?.name}.</h1>
        <p className="text-xl text-slate-500 font-light">Where will you go next?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Upcoming & Actions */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold text-slate-900">Upcoming Trips</h2>
              <Link to="/trips" className="text-brand-600 font-medium hover:text-brand-700 flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {upcomingTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingTrips.map(trip => (
                  <Link key={trip.id} to={`/trips/${trip.id}/builder`} className="group block">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 transition-all hover:shadow-md">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img src={trip.coverImage || 'https://picsum.photos/seed/trip/800/600'} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-xl font-bold mb-1">{trip.name}</h3>
                          <p className="text-sm opacity-90">{format(new Date(trip.startDate), 'dd MMM')} — {format(new Date(trip.endDate), 'dd MMM yyyy')}</p>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center bg-white">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {trip.stops.length} cities</span>
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {Math.max(1, differenceInDays(new Date(trip.endDate), new Date(trip.startDate)))} days</span>
                        </div>
                        <span className="font-medium text-slate-900">₹{(trip.stops.length * 35000).toLocaleString()} est.</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">No upcoming trips</h3>
                <p className="text-slate-500 mb-6">Your next adventure starts here. Plan your first unforgettable journey.</p>
                <Link to="/trips/new" className="inline-flex bg-brand-600 text-white px-6 py-3 rounded-full font-medium hover:bg-brand-700 transition-colors">
                  Plan New Trip
                </Link>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Recommended Destinations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedCities.map(city => (
                <div key={city.id} className="group cursor-pointer">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden relative mb-3">
                    <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h4 className="font-bold text-lg leading-tight">{city.name}</h4>
                      <p className="text-sm opacity-90">{city.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Budget & Actions */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <h2 className="text-lg font-medium opacity-90 mb-6 flex items-center gap-2"><Wallet className="w-5 h-5" /> Budget Snapshot</h2>

            {nextTrip ? (
              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-sm opacity-80 mb-1">Upcoming: {nextTrip.name}</p>
                  <p className="text-4xl font-display font-bold">₹{(nextTripCost + (nextTrip.stops.length * 30000)).toLocaleString()}</p>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm opacity-80 mb-1">Average / day</p>
                    <p className="text-xl font-medium">₹{Math.round((nextTripCost + (nextTrip.stops.length * 30000)) / (nextTripDays || 1)).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-xs font-medium border border-brand-500/30">
                      On Track
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center relative z-10">
                <p className="opacity-80">Plan a trip to see your budget insights here.</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/trips/new" className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-50 p-2 rounded-lg text-brand-600"><MapPin className="w-5 h-5" /></div>
                  <span className="font-medium text-slate-700">Plan a Trip</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/trips" className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><Calendar className="w-5 h-5" /></div>
                  <span className="font-medium text-slate-700">My Trips</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
