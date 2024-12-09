// src/services/api.js
import axios from 'axios';

// Set up Axios instance with the base URL for your API
const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Update with your API base URL
  headers: {
    'Content-Type': 'application/json',
  }
});

// Example of an API call to login
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
console.log('Making login request to backend');    return response.data;
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

// Example of a function to get the user profile (you can add more API functions here)
export const getUserProfile = async (token) => {
  try {
    const response = await api.get('/user-profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile.');
  }
};

// src/services/api.js
// Example for registration
export const register = async (email, password, name) => {
  try {
    const response = await api.post('/register', { email, password, name });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed. Please try again.');
  }
};
