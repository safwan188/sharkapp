import axios from 'axios';

const API_URL = 'https://shark-server-9cc777312ecd.herokuapp.com/api';

const apiUser = axios.create({
  baseURL: API_URL,
});



const LoginUser = (username, password) => {
  console.log(API_URL);
    return axios.post(`${API_URL}/users/loginExpert`, {
        username,
        password,
    });
    };



export default {
 
    LoginUser,

};