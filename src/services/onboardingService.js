import api from '../utils/api';

const onboardingService = {
  getOnboardingContent: async () => {
    try {
      return await api.get('/onboarding-content');
    } catch (error) {
      console.error('Error fetching onboarding content:', error);
      throw error;
    }
  },

  updateOnboardingContent: async (blocks) => {
    try {
      return await api.put('/onboarding-content', { blocks });
    } catch (error) {
      console.error('Error updating onboarding content:', error);
      throw error;
    }
  },

  updateBlock: async (id, data) => {
    try {
      return await api.put(`/onboarding-content/block/${id}`, data);
    } catch (error) {
      console.error('Error updating onboarding block:', error);
      throw error;
    }
  },

  resetOnboardingContent: async () => {
    try {
      return await api.post('/onboarding-content/reset');
    } catch (error) {
      console.error('Error resetting onboarding content:', error);
      throw error;
    }
  },

  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      return await api.post('/onboarding-content/upload-image', formData);
    } catch (error) {
      console.error('Error uploading onboarding image:', error);
      throw error;
    }
  }
};

export default onboardingService;
