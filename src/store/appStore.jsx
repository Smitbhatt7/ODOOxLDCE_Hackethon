import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoTrips } from '../data/demoTrips';
import { cities as initialCities } from '../data/cities';
import { activities as initialActivities } from '../data/activities';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Force a database reset to load the final local images
  useEffect(() => {
    const hasResetImages = localStorage.getItem('has_reset_images_local');
    if (!hasResetImages) {
      localStorage.clear();
      localStorage.setItem('has_reset_images_local', 'true');
      window.location.reload();
    }
  }, []);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('globetrotter_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('globetrotter_trips');
    return saved ? JSON.parse(saved) : demoTrips;
  });

  const [cities] = useState(initialCities);
  const [activities] = useState(initialActivities);

  useEffect(() => {
    localStorage.setItem('globetrotter_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('globetrotter_trips', JSON.stringify(trips));
  }, [trips]);

  const login = (email) => {
    setUser({ email, name: email.split('@')[0] || 'Demo User', profileImage: 'https://i.pravatar.cc/150?u=' + email });
  };
  
  const logout = () => {
    setUser(null);
  };

  const addTrip = (trip) => {
    const newTrip = { ...trip, id: Date.now().toString(), stops: [] };
    setTrips([...trips, newTrip]);
    return newTrip;
  };
  
  const updateTrip = (updatedTrip) => {
    setTrips(trips.map(t => t.id === updatedTrip.id ? updatedTrip : t));
  };

  const deleteTrip = (id) => {
    setTrips(trips.filter(t => t.id !== id));
  };

  const copyTrip = (tripToCopy) => {
    const newTrip = { 
      ...tripToCopy, 
      id: Date.now().toString(), 
      name: `${tripToCopy.name} (Copy)` 
    };
    setTrips([...trips, newTrip]);
    return newTrip;
  };
  
  return (
    <AppContext.Provider value={{
      user, login, logout,
      trips, addTrip, updateTrip, deleteTrip, copyTrip,
      cities, activities
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
