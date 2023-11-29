// src/services/apiExperts.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://shark-server-9cc777312ecd.herokuapp.com/api/experts'; // Adjust to match your Express server's port and route
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add JWT authentication interceptor
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



const getExpertbyusername =async () => {
  
    return apiClient.get(`${API_URL}/expertbytz`);
};



const deleteExpert = (id) => {
  return apiClient.delete(`${API_URL}/${id}`);
};

// Additional function to get reports for a specific expert
const getExpertReports = (expertId) => {
  return apiClient.get(`${API_URL}/${expertId}/reports`);
};

export default {
  getExpertbyusername,

  getExpertReports
};
