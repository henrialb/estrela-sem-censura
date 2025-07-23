import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : 'http://localhost:3000/api';

const requestArgs = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const publicApi = axios.create(requestArgs);
export const authApi = axios.create(requestArgs);

authApi.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle auth errors
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('auth_token');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);
