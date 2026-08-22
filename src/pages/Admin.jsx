import { useAppContext } from '../store/appStore';
import { Users, Map, Activity, TrendingUp } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';

export default function Admin() {
  const { trips } = useAppContext();

  // Mock data for charts
  const userGrowthData = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 600 },
    { name: 'Mar', users: 800 },
    { name: 'Apr', users: 1200 },
    { name: 'May', users: 1800 },
    { name: 'Jun', users: 2400 },
  ];

  const popularCitiesData = [
    { name: 'Paris', visits: 120 },
    { name: 'Tokyo', visits: 98 },
    { name: 'Rome', visits: 86 },
    { name: 'Bali', visits: 75 },
    { name: 'Amsterdam', visits: 65 },
  ];

  const tripThemesData = [
    { name: 'Relaxation', value: 400, color: '#0ea5e9' },
    { name: 'Adventure', value: 300, color: '#f59e0b' },
    { name: 'Culture', value: 300, color: '#8b5cf6' },
    { name: 'Food', value: 200, color: '#10b981' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="mb-10">
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-xl text-slate-500 font-light">Platform analytics and user engagement metrics.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-xl"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Users</p>
            <p className="text-2xl font-bold text-slate-900">2,408</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Map className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Trips Created</p>
            <p className="text-2xl font-bold text-slate-900">{8192 + trips.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Activity className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Active Activities</p>
            <p className="text-2xl font-bold text-slate-900">45,304</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Avg Trip Cost</p>
            <p className="text-2xl font-bold text-slate-900">₹64,200</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">User Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Popular Destinations</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularCitiesData} layout="vertical" margin={{top: 0, right: 20, left: 40, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontWeight: 500}} />
                <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="visits" fill="#8b5cf6" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm lg:col-span-1">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Trip Themes</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tripThemesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {tripThemesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Platform Activity</h3>
            <div className="space-y-4">
                {[
                    { user: 'Sarah J.', action: 'published a new public itinerary', time: '10 minutes ago', icon: <Map className="w-4 h-4" /> },
                    { user: 'David C.', action: 'copied "European Summer" to their trips', time: '1 hour ago', icon: <Users className="w-4 h-4" /> },
                    { user: 'Emma W.', action: 'created a new account', time: '2 hours ago', icon: <Users className="w-4 h-4" /> },
                    { user: 'Michael B.', action: 'added 3 activities in Paris', time: '3 hours ago', icon: <Activity className="w-4 h-4" /> },
                ].map((log, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
                        <div className="p-2 bg-slate-100 text-slate-600 rounded-full">{log.icon}</div>
                        <div className="flex-1">
                            <p className="text-sm text-slate-900"><span className="font-semibold">{log.user}</span> {log.action}</p>
                            <p className="text-xs text-slate-500">{log.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
