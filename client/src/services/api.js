import axios from 'axios';

const API_URL = 'https://personal-task-management.onrender.com';
const API_BASE_PATH = '/api'; // Add this line

const api = axios.create({
  baseURL: `${API_URL}${API_BASE_PATH}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear the token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
  }
};

// Add error handling wrapper
const apiCall = async (method, ...args) => {
  try {
    const response = await method(...args);
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

// Wrap all API calls with the error handling wrapper
export const login = (credentials) => apiCall(api.post, '/users/login', credentials);
export const register = (userData) => apiCall(api.post, '/users/register', userData);
export const getTasks = () => apiCall(api.get, '/tasks');
export const createTask = (taskData) => apiCall(api.post, '/tasks', taskData);
export const updateTask = (taskId, taskData) => apiCall(api.put, `/tasks/${taskId}`, taskData);
export const deleteTask = (taskId) => apiCall(api.delete, `/tasks/${taskId}`);

export const getUserProfile = () => apiCall(api.get, '/users/profile');
export const updateUserProfile = (userData) => apiCall(api.put, '/users/profile', userData);
export const changePassword = (passwordData) => apiCall(api.post, '/users/change-password', passwordData);

export const forgotPassword = (email) => apiCall(api.post, '/users/forgot-password', { email });
export const resetPassword = (email, password) => apiCall(api.post, '/users/reset-password', { email, password });

export default api;