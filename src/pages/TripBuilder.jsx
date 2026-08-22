import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/appStore';
import { ArrowLeft, Share2, Calendar, Wallet, Search, Plus, MapPin, X, Trash2, ChevronUp, ChevronDown, Clock, Tag, Sparkles, Loader2, Printer } from 'lucide-react';
import { format, differenceInDays, addDays, parseISO } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function TripBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips, updateTrip, cities, activities, copyTrip } = useAppContext();
  
  const [trip, setTrip] = useState(null);
  const [activeTab, setActiveTab] = useState('itinerary'); // itinerary, budget
  const [showCitySearch, setShowCitySearch] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  
  const [showActivitySearch, setShowActivitySearch] = useState(null); // cityId
  const [activitySearchQuery, setActivitySearchQuery] = useState('');
  const [activityCategoryFilter, setActivityCategoryFilter] = useState('All');
  const [isAIGenerating, setIsAIGenerating] = useState(false);

  useEffect(() => {
    const t = trips.find(t => t.id === id);
    if (t) setTrip(t);
  }, [id, trips]);

  const handleAIGenerate = () => {
    setIsAIGenerating(true);
    setTimeout(() => {
      const firstStopEnd = format(addDays(parseISO(trip.startDate), 3), 'yyyy-MM-dd');
      const secondStopEnd = format(addDays(parseISO(firstStopEnd), 2), 'yyyy-MM-dd');
      
      const generatedStops = [
        {
          id: Date.now().toString(),
          cityId: cities[0].id, // Paris
          startDate: trip.startDate,
          endDate: firstStopEnd,
          activities: [
            { ...activities.find(a => a.id === 'a1'), day: 1 },
            { ...activities.find(a => a.id === 'a2'), day: 2 }
          ]
        },
        {
          id: (Date.now() + 1).toString(),
          cityId: cities[2].id, // Rome
          startDate: firstStopEnd,
          endDate: secondStopEnd,
          activities: [
            { ...activities.find(a => a.id === 'a7'), day: 1 }
          ]
        }
      ];
      const updatedTrip = { ...trip, stops: generatedStops };
      setTrip(updatedTrip);
      updateTrip(updatedTrip);
      setIsAIGenerating(false);
    }, 2000);
  };

  if (!trip) return <div className="p-10">Loading trip...</div>;

  const tripDays = Math.max(1, differenceInDays(new Date(trip.endDate), new Date(trip.startDate)));

  const handleUpdateTrip = (updatedTrip) => {
    setTrip(updatedTrip);
    updateTrip(updatedTrip);
  };

  const handleAddStop = (city) => {
    // Calculate start date based on previous stops
    let newStartDate = trip.startDate;
    if (trip.stops.length > 0) {
      const lastStop = trip.stops[trip.stops.length - 1];
      newStartDate = lastStop.endDate;
    }
    const newEndDate = format(addDays(parseISO(newStartDate), 3), 'yyyy-MM-dd'); // default 3 days
    
    const newStop = {
      id: Date.now().toString(),
      cityId: city.id,
      startDate: newStartDate,
      endDate: newEndDate,
      activities: []
    };
    
    handleUpdateTrip({
      ...trip,
      stops: [...trip.stops, newStop]
    });
    setShowCitySearch(false);
  };

  const handleRemoveStop = (stopId) => {
    handleUpdateTrip({
      ...trip,
      stops: trip.stops.filter(s => s.id !== stopId)
    });
  };

  const moveStop = (index, direction) => {
    const newStops = [...trip.stops];
    if (direction === 'up' && index > 0) {
      [newStops[index - 1], newStops[index]] = [newStops[index], newStops[index - 1]];
    } else if (direction === 'down' && index < newStops.length - 1) {
      [newStops[index + 1], newStops[index]] = [newStops[index], newStops[index + 1]];
    }
    handleUpdateTrip({ ...trip, stops: newStops });
  };

  const handleAddActivity = (stopId, activity) => {
    const stopIndex = trip.stops.findIndex(s => s.id === stopId);
    if (stopIndex === -1) return;
    
    const stop = trip.stops[stopIndex];
    const newActivity = {
      id: Date.now().toString(),
      activityId: activity.id,
      date: stop.startDate,
      time: '10:00',
      customCost: activity.cost
    };

    const newStops = [...trip.stops];
    newStops[stopIndex] = {
      ...stop,
      activities: [...stop.activities, newActivity]
    };

    handleUpdateTrip({ ...trip, stops: newStops });
    setShowActivitySearch(null);
  };

  const handleRemoveActivity = (stopId, tripActivityId) => {
    const stopIndex = trip.stops.findIndex(s => s.id === stopId);
    if (stopIndex === -1) return;

    const newStops = [...trip.stops];
    newStops[stopIndex] = {
      ...newStops[stopIndex],
      activities: newStops[stopIndex].activities.filter(a => a.id !== tripActivityId)
    };

    handleUpdateTrip({ ...trip, stops: newStops });
  };

  // --- Budget Calculations ---
  const totalActivitiesCost = trip.stops.reduce((acc, stop) => 
    acc + stop.activities.reduce((sum, act) => sum + act.customCost, 0), 0);
  
  // Fake base costs based on number of days and cities
  const transportCost = trip.stops.length * 15000;
  const stayCost = tripDays * 8000;
  const mealsCost = tripDays * 3000;
  const totalCost = totalActivitiesCost + transportCost + stayCost + mealsCost;

  const budgetData = [
    { name: 'Transport', value: transportCost, color: '#3b82f6' },
    { name: 'Accommodation', value: stayCost, color: '#8b5cf6' },
    { name: 'Meals', value: mealsCost, color: '#f59e0b' },
    { name: 'Activities', value: totalActivitiesCost, color: '#10b981' },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/trips" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{trip.name}</h1>
            <p className="text-sm text-slate-500">
              {format(new Date(trip.startDate), 'MMM dd')} — {format(new Date(trip.endDate), 'MMM dd, yyyy')} · {tripDays} days
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium transition-colors">
            <Printer className="w-4 h-4" /> Print PDF
          </button>
          <Link to={`/share/${trip.id}`} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </Link>
          <div className="bg-brand-50 text-brand-700 px-4 py-2 rounded-full font-bold">
            ₹{totalCost.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Stops */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900 uppercase tracking-wider text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> Route</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {trip.stops.map((stop, index) => {
              const city = cities.find(c => c.id === stop.cityId);
              return (
                <div key={stop.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 relative group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-900 text-lg">{city?.name}</h3>
                    <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => moveStop(index, 'up')} disabled={index === 0} className="p-1 hover:text-brand-600 disabled:opacity-30"><ChevronUp className="w-4 h-4" /></button>
                      <button onClick={() => moveStop(index, 'down')} disabled={index === trip.stops.length - 1} className="p-1 hover:text-brand-600 disabled:opacity-30"><ChevronDown className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 mb-4">
                    {format(new Date(stop.startDate), 'MMM dd')} — {format(new Date(stop.endDate), 'MMM dd')}
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowActivitySearch(stop.id)}
                      className="flex-1 bg-white border border-slate-200 hover:border-brand-300 text-slate-700 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                      + Activity
                    </button>
                    <button onClick={() => handleRemoveStop(stop.id)} className="p-2 bg-white border border-slate-200 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            
            <button 
              onClick={() => setShowCitySearch(true)}
              className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-medium hover:border-brand-500 hover:text-brand-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Destination
            </button>
          </div>
        </div>

        {/* Center/Right Content Area */}
        <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
          
          {/* Tabs */}
          <div className="bg-white border-b border-slate-200 px-6 flex gap-6 shrink-0">
            <button 
              onClick={() => setActiveTab('itinerary')}
              className={`py-4 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'itinerary' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              <Calendar className="w-4 h-4" /> Itinerary
            </button>
            <button 
              onClick={() => setActiveTab('budget')}
              className={`py-4 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'budget' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              <Wallet className="w-4 h-4" /> Budget
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`py-4 font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'calendar' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              <Calendar className="w-4 h-4" /> Calendar View
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            
            {activeTab === 'itinerary' && (
              <div className="max-w-4xl mx-auto">
                {trip.stops.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-200 border-dashed">
                    <MapPin className="w-16 h-16 text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No destinations yet</h3>
                    <p className="text-slate-500 mb-6 max-w-md mx-auto">
                      Start building your itinerary by adding cities you want to visit on this trip.
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setShowCitySearch(true)}
                        className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                      >
                        Add First Destination
                      </button>
                      <button 
                        onClick={handleAIGenerate}
                        disabled={isAIGenerating}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isAIGenerating ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
                        ) : (
                          <><Sparkles className="w-5 h-5" /> Auto-Generate with AI</>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {trip.stops.map((stop, stopIndex) => {
                      const city = cities.find(c => c.id === stop.cityId);
                      return (
                        <div key={stop.id} className="relative">
                          {/* City Header */}
                          <div className="sticky top-0 z-10 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md py-4 border-b border-slate-200 dark:border-slate-700 mb-6 transition-colors">
                            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">{city?.name}</h2>
                            <p className="text-brand-600 dark:text-brand-400 font-medium">
                              {stop.startDate ? format(new Date(stop.startDate), 'MMMM do') : 'TBD'} — {stop.endDate ? format(new Date(stop.endDate), 'MMMM do') : 'TBD'}
                            </p>
                          </div>

                          {/* Activities Timeline */}
                          <div className="space-y-6 ml-4 border-l-2 border-slate-200 pl-8 relative">
                            {stop.activities.length === 0 ? (
                              <div className="text-slate-500 py-4 italic">No activities added yet. Click "+ Activity" in the sidebar.</div>
                            ) : (
                              [...stop.activities].sort((a, b) => a.time.localeCompare(b.time)).map((tripAct) => {
                                const activity = activities.find(a => a.id === tripAct.activityId);
                                return (
                                  <div key={tripAct.id} className="relative group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="absolute -left-[41px] top-6 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-slate-50" />
                                    
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <div className="flex items-center gap-3 mb-2">
                                          <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-lg text-sm">{tripAct.time}</span>
                                          <span className="text-brand-600 font-medium text-sm flex items-center gap-1"><Clock className="w-3 h-3"/> {activity?.duration}h</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1">{activity?.name}</h3>
                                        <p className="text-slate-500 text-sm mb-3 max-w-xl">{activity?.description}</p>
                                        <div className="flex items-center gap-3 text-sm">
                                          <span className="flex items-center gap-1 text-slate-600"><Tag className="w-4 h-4"/> {activity?.category}</span>
                                          <span className="font-medium text-slate-900">₹{tripAct.customCost.toLocaleString()}</span>
                                        </div>
                                      </div>
                                      <div className="flex gap-2">
                                        <button className="p-2 text-slate-400 hover:text-brand-600 transition-colors opacity-0 group-hover:opacity-100"><Calendar className="w-4 h-4" /></button>
                                        <button onClick={() => handleRemoveActivity(stop.id, tripAct.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="max-w-4xl mx-auto">
                 <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                   <h2 className="text-xl font-bold mb-6 text-slate-900 text-center">{format(new Date(trip.startDate), 'MMMM yyyy')}</h2>
                   
                   <div className="grid grid-cols-7 gap-px bg-slate-200">
                     {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="bg-slate-50 py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                           {day}
                        </div>
                     ))}
                     
                     {/* Calendar blanks before start */}
                     {Array.from({ length: new Date(trip.startDate).getDay() }).map((_, i) => (
                       <div key={`blank-${i}`} className="bg-white min-h-[100px]" />
                     ))}
                     
                     {/* Calendar Days */}
                     {Array.from({ length: tripDays }).map((_, i) => {
                       const currentDate = format(addDays(new Date(trip.startDate), i), 'yyyy-MM-dd');
                       const stopsOnDay = trip.stops.filter(s => currentDate >= s.startDate && currentDate <= s.endDate);
                       const dayNumber = new Date(currentDate).getDate();
                       
                       return (
                         <div key={currentDate} className="bg-white min-h-[100px] p-2 hover:bg-slate-50 transition-colors border-t-2 border-brand-500 relative">
                           <span className="font-semibold text-slate-700">{dayNumber}</span>
                           <div className="mt-1 space-y-1">
                             {stopsOnDay.map((stop, stopIdx) => {
                               const city = cities.find(c => c.id === stop.cityId);
                               return (
                                 <div key={stopIdx} className="text-[10px] bg-brand-100 text-brand-700 px-1 py-0.5 rounded font-medium">
                                   {city?.name}
                                 </div>
                               );
                             })}
                           </div>
                         </div>
                       )
                     })}
                     
                     {/* Calendar blanks after end */}
                     {Array.from({ length: (7 - (new Date(trip.endDate).getDay() + 1)) % 7 }).map((_, i) => (
                       <div key={`blank-end-${i}`} className="bg-white min-h-[100px]" />
                     ))}
                   </div>
                 </div>
              </div>
            )}

            {activeTab === 'budget' && (
              <div className="max-w-5xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900 text-white p-8 rounded-3xl col-span-1 shadow-lg relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                     <h2 className="text-lg opacity-80 mb-2">Total Estimated Cost</h2>
                     <p className="text-5xl font-display font-bold mb-8">₹{totalCost.toLocaleString()}</p>
                     
                     <div className="space-y-4">
                       <div className="flex justify-between items-center pb-4 border-b border-white/10">
                         <span className="opacity-80">Average per day</span>
                         <span className="font-bold text-xl">₹{Math.round(totalCost / tripDays).toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="opacity-80">Budget Status</span>
                         <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium border border-emerald-500/20">On Track</span>
                       </div>
                     </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-200 col-span-1 md:col-span-2 shadow-sm flex items-center justify-center">
                    <div className="w-full h-[250px] flex">
                      <div className="w-1/2 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={budgetData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={2}
                              dataKey="value"
                              stroke="none"
                            >
                              {budgetData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="w-1/2 flex flex-col justify-center gap-4 pl-4">
                        {budgetData.map(item => (
                          <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-slate-600 font-medium">{item.name}</span>
                            </div>
                            <span className="font-bold text-slate-900">₹{item.value.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Detailed Breakdown</h3>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                        <th className="pb-4 font-medium">Category</th>
                        <th className="pb-4 font-medium text-right">Cost</th>
                        <th className="pb-4 font-medium text-right">% of Budget</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {budgetData.map(item => (
                        <tr key={item.name}>
                          <td className="py-4 font-medium text-slate-900 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                             {item.name}
                          </td>
                          <td className="py-4 text-right font-medium">₹{item.value.toLocaleString()}</td>
                          <td className="py-4 text-right text-slate-500">{Math.round((item.value / totalCost) * 100)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCitySearch && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-2xl font-bold text-slate-900">Add Destination</h2>
              <button onClick={() => setShowCitySearch(false)} className="p-2 hover:bg-slate-200 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search cities, countries..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow text-lg"
                  value={citySearchQuery}
                  onChange={(e) => setCitySearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cities.filter(c => c.name.toLowerCase().includes(citySearchQuery.toLowerCase()) || c.country.toLowerCase().includes(citySearchQuery.toLowerCase())).map(city => (
                  <div key={city.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col hover:border-brand-300 transition-colors">
                    <img src={city.image} alt={city.name} className="w-full h-32 object-cover" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{city.name}</h3>
                        <p className="text-sm text-slate-500 mb-3">{city.country}</p>
                      </div>
                      <button 
                        onClick={() => handleAddStop(city)}
                        className="w-full py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
                      >
                        Add to Trip
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showActivitySearch && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-2xl font-bold text-slate-900">Discover Activities</h2>
              <button onClick={() => setShowActivitySearch(null)} className="p-2 hover:bg-slate-200 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 border-b border-slate-200 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search activities..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow text-lg"
                  value={activitySearchQuery}
                  onChange={(e) => setActivitySearchQuery(e.target.value)}
                />
              </div>
              <select 
                value={activityCategoryFilter} 
                onChange={(e) => setActivityCategoryFilter(e.target.value)}
                className="px-4 py-3 bg-slate-100 rounded-xl border-none focus:ring-2 focus:ring-brand-500 outline-none font-medium"
              >
                <option value="All">All Categories</option>
                <option value="Sightseeing">Sightseeing</option>
                <option value="Culture">Culture</option>
                <option value="Food">Food</option>
                <option value="Adventure">Adventure</option>
                <option value="Nature">Nature</option>
              </select>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activities
                  .filter(a => {
                    const targetStop = trip.stops.find(s => s.id === showActivitySearch);
                    return a.cityId === targetStop?.cityId;
                  })
                  .filter(a => a.name.toLowerCase().includes(activitySearchQuery.toLowerCase()))
                  .filter(a => activityCategoryFilter === 'All' || a.category === activityCategoryFilter)
                  .map(activity => (
                  <div key={activity.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-row h-40 hover:border-brand-300 transition-colors">
                    <img src={activity.image} alt={activity.name} className="w-1/3 h-full object-cover" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-lg leading-tight">{activity.name}</h3>
                          <span className="font-bold text-brand-600 whitespace-nowrap ml-2">₹{activity.cost}</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2 flex gap-2">
                          <span className="bg-slate-100 px-2 py-0.5 rounded">{activity.category}</span>
                          <span className="bg-slate-100 px-2 py-0.5 rounded">{activity.duration}h</span>
                        </p>
                        <p className="text-sm text-slate-600 line-clamp-2">{activity.description}</p>
                      </div>
                      <button 
                        onClick={() => handleAddActivity(showActivitySearch, activity)}
                        className="self-start text-brand-600 font-medium hover:text-brand-700 text-sm flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4"/> Add to Itinerary
                      </button>
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
