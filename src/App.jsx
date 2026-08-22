import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './store/appStore';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyTrips from './pages/MyTrips';
import CreateTrip from './pages/CreateTrip';
import TripBuilder from './pages/TripBuilder';
import PublicTrip from './pages/PublicTrip';
import Profile from './pages/Profile';
import CommunityHub from './pages/CommunityHub';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const Layout = ({ children }) => {
  const { user } = useAppContext();
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors">
      {user && <Navbar />}
      <main className="flex-1 flex flex-col text-slate-900 dark:text-slate-100">{children}</main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
            <Route path="/trips/new" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
            <Route path="/trips/:id/builder" element={<ProtectedRoute><TripBuilder /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><CommunityHub /></ProtectedRoute>} />
            <Route path="/share/:id" element={<PublicTrip />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
