import React, { createContext, useState, useCallback } from 'react';
import * as userService from '../services/userService';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.getDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    dashboardData,
    loading,
    fetchDashboardData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
