// import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Function to log in a user
const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    if (response.data.token) {
      // Store the token and user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Function to log out a user
const logout = () => {
  // Remove the user data from localStorage
  localStorage.removeItem('user');
};

// Function to get the current user
const getCurrentUser = () => {
  // Retrieve the user data from localStorage
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!user?.token;
};

// Function to check if the user is an admin
const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

export default {
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  isAdmin,
};