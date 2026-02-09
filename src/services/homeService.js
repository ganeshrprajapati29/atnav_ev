import api from '../utils/api';

const homeService = {
  getHomeContent: async () => {
    try {
      console.log("🔄 homeService: Fetching home content...");
      // api already returns response.data due to interceptor
      const data = await api.get('/home-content');
      console.log("✅ homeService: Data received:", data);
      return data; // Directly return data, not response.data
    } catch (error) {
      console.error('❌ homeService: Error:', error);
      throw error;
    }
  },
  
  updateHomeContent: async (data) => {
    try {
      return await api.put('/home-content', data);
    } catch (error) {
      console.error('Error updating home content:', error);
      throw error;
    }
  },
  
  updateSection: async (id, data) => {
    try {
      return await api.put(`/home-content/section/${id}`, data);
    } catch (error) {
      console.error('Error updating section:', error);
      throw error;
    }
  }
};

export default homeService;