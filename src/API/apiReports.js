// src/services/apiReports.js

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://shark-server-9cc777312ecd.herokuapp.com/api/reports';



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




const getAllReports = async () => {
  const token = await AsyncStorage.getItem('token');
  return apiClient.get('/getopen');
};


const getReportsByExpertId = (id) => {
  return apiClient.get(`/reportsbyexpert/${id}`);
};
export default {
  getAllReports,

  getReportsByExpertId

};
