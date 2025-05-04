import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add request interceptor to include token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto logout if 401 response returned from API
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const API = {
  // Pet operations
  getPets: () => api.get('/pets'),
  addPet: (pet) => api.post('/pets', pet),
  updatePet: (id, pet) => api.put(`/pets/${id}`, pet),
  adoptPet: (id) => api.patch(`/pets/${id}/adopt`),
  deletePet: (id) => api.delete(`/pets/${id}`),
  filterByMood: (mood) => api.get(`/pets/filter/mood?mood=${mood}`),

  // Species operations
  getSpecies: () => api.get('/species'),
  addSpecies: (data) => api.post('/species', data),
  updateSpecies: (id, data) => api.put(`/species/${id}`, data),
  deleteSpecies: (id) => api.delete(`/species/${id}`),
  getSpeciesById: (id) => api.get(`/species/${id}`),

  // Personality operations
  getPersonalities: () => api.get('/personalities'),
  addPersonality: (data) => api.post('/personalities', data),
  updatePersonality: (id, data) => api.put(`/personalities/${id}`, data),
  deletePersonality: (id) => api.delete(`/personalities/${id}`),
  getPersonalityById: (id) => api.get(`/personalities/${id}`),

  // Auth operations
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    return api.post('/auth/logout');
  },
  checkAuth: () => api.get('/auth/me'),

  // Admin operations
  adminRegister: (adminData) => api.post('/admin/register', adminData),
  adminLogin: (credentials) => api.post('/admin/login', credentials),
  adminLogout: () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminLoggedIn');
    return api.post('/admin/logout');
  },
  getAdminProfile: () => api.get('/admin/profile'),
  getById: (id) => api.get(`/admin/${id}`),
  update: (id, data) => api.put(`/admin/${id}`, data),

  // Contact operations
  sendContact: (data) => api.post('/contacts', data),
  getAllContacts: () => api.get('/contacts'),

  // Feedback operations
  addFeedback: (data) => api.post('/feedback', data),
  getAllFeedback: () => api.get('/feedback'),

  // User operations
  getAllUsers: () => api.get('/user'),
  getUserById: (id) => api.get(`/user/${id}`),
  updateUser: (id, data) => api.put(`/user/${id}`, data),

  // Count operations
  getCounts: () => api.get('/counts'),

  // Adopted operations
  getAllAdopted: () => api.get('/adopted'),

  // Helper method to get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Helper method to get current admin
  getCurrentAdmin: () => {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  }
};

export default API;
