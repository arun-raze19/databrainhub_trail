import axios from 'axios';
import { API_URL } from '../config/api';

// Configure axios defaults
axios.defaults.baseURL = API_URL;

// Helper function to create API endpoints
export const createApiEndpoint = (endpoint) => {
  return `${API_URL}/${endpoint}`;
};

// Configure axios instance with default settings
export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Export a pre-configured axios instance
export default apiClient;
