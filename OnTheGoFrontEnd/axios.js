import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseURL = 'http://10.0.2.2:8000/api/';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Accessing the access token from async and passing the token value as authorization parameter
axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access_token');
    // console.log("axios token recieved:",token)
    // Here, auth parameter is passed
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  // If token does not exists then auth will be failed then axios will give an error
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    if (response.status === '401') {
      alert('You are not authorized');
    }
    return response;
  },

  async error => {
    const errorMsg = error.message;
    const errorCode = '401';
    const errorCheck = errorMsg.includes(errorCode);
    const refresh_token = await AsyncStorage.getItem('refresh_token');

    if (errorCheck) {
      console.log('error:', errorMsg);
      // Calling for the refresh view to generate new access and refresh token 
      // In case where access token is not valid anymore(timeout)
      return axiosInstance
        .post('token/refresh', {
          refresh: refresh_token,
        })
        .then(response => {
          console.log('token is refreshed:', response.data);
          AsyncStorage.setItem('access_token', response.data.access);
          AsyncStorage.setItem('refresh_token', response.data.refresh);
          // AsyncStorage.setItem('Token Error', JSON.stringify(false))
          error.response.config.headers.Authorization = `Bearer ${response.data.access}`;
        })
        .catch(error => {
          console.log('error occured during:', error);
          // AsyncStorage.setItem('Token Error', JSON.stringify(true));
          return Promise.reject(error);
        });
    } else {
      console.log('token is still valid');
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;

//   const user = jwt_decode(token);
// const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
// console.log('expired status:', isExpired);

// if (isExpired) {
//   const response = await axiosInstance.post('token/refresh', {
//     refresh: refresh_token,
//   });
//   console.log(response.data);
// AsyncStorage.setItem('access_token', response.data.access);
// AsyncStorage.setItem('refresh_token', response.data.refresh);
// config.headers.Authorization = `Bearer ${response.data.access}`;

// if (!isExpired) return config;

// const response = await axiosInstance.post('token/refresh/', {
//   refresh: refresh_token,
// });

// AsyncStorage.setItem('access_token', response.data.access);
// AsyncStorage.setItem('refresh_token', response.data.refresh);
// config.headers.Authorization = `Bearer ${response.data.access}`;
