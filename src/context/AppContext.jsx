import React, { createContext, useState, useCallback } from 'react';
import * as userService from '../services/userService';
import homeService from '../services/homeService';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [homeContent, setHomeContent] = useState(null);
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

  const fetchHomeContent = useCallback(async () => {
    try {
      const data = await homeService.getHomeContent();
      setHomeContent(data);
    } catch (error) {
      console.error('Failed to fetch home content:', error);
    }
  }, []);

  const updateHomeContent = useCallback(async (data) => {
    try {
      const response = await homeService.updateHomeContent(data);
      setHomeContent(prev => response.data ? { ...response.data } : prev);
      return response.data;
    } catch (error) {
      console.error('Failed to update home content:', error);
      throw error;
    }
  }, []);

  const value = {
    dashboardData,
    homeContent,
    loading,
    fetchDashboardData,
    fetchHomeContent,
    updateHomeContent
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
