import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as authService from '../services/authService';
import * as tokenService from '../utils/token';
import LoginRewardPopup from '../components/LoginRewardPopup';
import RegistrationSuccessPopup from '../components/RegistrationSuccessPopup';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginReward, setLoginReward] = useState(null); // { coins: number }
  const [registrationSuccess, setRegistrationSuccess] = useState(null); // { userId: string }
  const navigate = useNavigate();

  useEffect(() => {
    const token = tokenService.getToken();
    if (token) {
      // Verify token and get user data
      authService.getProfile()
        .then(data => {
          setUser(data);
        })
        .catch(() => {
          tokenService.removeToken();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      tokenService.setToken(data.token);
      setUser(data);

      // Show login reward popup
      if (data.rewardEarned > 0) {
        setLoginReward({ coins: data.rewardEarned });
      }

      // Navigate based on user role and activation status
      if (data.isAdmin) {
        navigate('/admin');
      } else if (!data.serviceActivated) {
        navigate('/payment');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      tokenService.setToken(data.token);
      setUser(data);
      // Show registration success popup with user ID
      setRegistrationSuccess({ userId: data.uniqueId });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    tokenService.removeToken();
    setUser(null);
    navigate('/');
    toast.info('Logged out successfully');
  };

  const closeLoginRewardPopup = () => {
    setLoginReward(null);
  };

  const closeRegistrationSuccessPopupGoHome = () => {
    setRegistrationSuccess(null);
    navigate('/dashboard');
  };

  const closeRegistrationSuccessPopupMakePayment = () => {
    setRegistrationSuccess(null);
    navigate('/payment');
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {loginReward && (
        <LoginRewardPopup
          coins={loginReward.coins}
          onClose={closeLoginRewardPopup}
        />
      )}
      {registrationSuccess && (
        <RegistrationSuccessPopup
          userId={registrationSuccess.userId}
          onGoHome={closeRegistrationSuccessPopupGoHome}
          onMakePayment={closeRegistrationSuccessPopupMakePayment}
        />
      )}
    </AuthContext.Provider>
  );
};
