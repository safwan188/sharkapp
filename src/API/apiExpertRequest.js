import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://shark-server-9cc777312ecd.herokuapp.com/api/expertrequests';

const apiRequests = axios.create({
  baseURL: API_URL,
});

const createRequest = async (requestData) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return apiRequests.post('/', requestData, { headers });
};
export default {
    createRequest,
};