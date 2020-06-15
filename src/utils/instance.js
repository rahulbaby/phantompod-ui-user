/*
HHTP CLIENT HANDLING
Here we handles the HTTP calls used through out our app.
REF : https://github.com/axios/axios
*/
import axios from 'axios';
import qs from 'qs';
import { AUTH_TOKEN_KEY } from 'config';

import { BASE_URL } from 'config';

var instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    //'Access-Control-Allow-Origin': '*'
  },
});
instance.defaults.timeout = 20000;
//instance.defaults.withCredentials = true;

const searchParams = (params) =>
  Object.keys(params)
    .map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    })
    .join('&');

instance.interceptors.request.use(async (config) => {
  const token = await localStorage[AUTH_TOKEN_KEY];
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) return response.data;
    else return response;
  },
  (error) => {
    const { response } = error;

    //console.log(error);
    console.log(response.data);
    //console.log(response.status);
    let message = error.message || error.message || 'Operation failed !';
    message = response.data && response.data.message ? response.data.message : message;
    message = response.data && response.data.message ? response.data.message : message;

    return {
      status: response && response.status ? response.status : 500,
      message: response && response.message ? response.message : message,
      error: response && response.data && response.data.error ? response.data.error : true,
    };
  },
);

export default instance;
