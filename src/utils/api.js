import axios from 'axios';
import * as tokenService from './token';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://maroon-swallow-915757.hostingersite.com/api';
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// REQUEST INTERCEPTOR — add token
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR — clean output + auto logout on 401
api.interceptors.response.use(
  (response) => {
    // response.data hi return karo
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      tokenService.removeToken();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
