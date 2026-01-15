import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dependencies.length > 0 && dependencies.every(dep => dep !== undefined)) {
      execute();
    }
  }, dependencies);

  return { data, loading, error, execute };
};
