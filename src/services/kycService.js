import api from '../utils/api';

export const submitKYC = async (formData, files) => {
  const data = new FormData();

  // Add form data
  Object.keys(formData).forEach(key => {
    data.append(key, formData[key]);
  });

  // Add files
  if (files.aadhaarDocument) {
    data.append('aadhaarDocument', files.aadhaarDocument);
  }
  if (files.panDocument) {
    data.append('panDocument', files.panDocument);
  }
  if (files.selfie) {
    data.append('selfie', files.selfie);
  }

  return api.post('/kyc/submit', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getKYCStatus = async () => {
  return api.get('/kyc/status');
};

export const getKYCDetails = async () => {
  return api.get('/kyc/details');
};

// Admin functions
export const getAllKYC = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return api.get(`/kyc/admin/all?${queryString}`);
};

export const reviewKYC = async (id, status, rejectionReason = '') => {
  return api.put(`/kyc/admin/review/${id}`, { status, rejectionReason });
};

export const getKYCStats = async () => {
  return api.get('/kyc/admin/stats');
};
