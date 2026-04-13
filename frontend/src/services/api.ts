import axios, { AxiosInstance, AxiosError } from 'axios';
import config from './config';

/**
 * API Error Handler
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any,
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Create Axios instance with config
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - add JWT token if available
 */
apiClient.interceptors.request.use((reqConfig) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }
  return reqConfig;
});

/**
 * Response interceptor - handle errors
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    const status = error.response?.status;

    // Handle 401 - token expired
    if (status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/';
    }

    throw new APIError(message as string, status, error.response?.data);
  },
);

/**
 * API Service
 */
export const api = {
  // Auth endpoints
  auth: {
    login: (challenge: string) => apiClient.post('/auth/login', { challenge }),
    verify: (signature: string, publicKey: string) =>
      apiClient.post('/auth/verify', { signature, publicKey }),
    logout: () => apiClient.post('/auth/logout'),
    me: () => apiClient.get('/auth/me'),
  },

  // Projects endpoints
  projects: {
    list: (page = 1, limit = 10) =>
      apiClient.get('/projects', { params: { page, limit } }),
    get: (id: string) => apiClient.get(`/projects/${id}`),
    create: (data: any) => apiClient.post('/projects', data),
    update: (id: string, data: any) => apiClient.put(`/projects/${id}`, data),
    delete: (id: string) => apiClient.delete(`/projects/${id}`),
  },

  // Tasks endpoints
  tasks: {
    list: (filters?: any) => apiClient.get('/tasks', { params: filters }),
    get: (id: string) => apiClient.get(`/tasks/${id}`),
    create: (data: any) => apiClient.post('/tasks', data),
    update: (id: string, data: any) => apiClient.put(`/tasks/${id}`, data),
    delete: (id: string) => apiClient.delete(`/tasks/${id}`),
    submissions: (taskId: string) => apiClient.get(`/tasks/${taskId}/submissions`),
  },

  // Submissions endpoints
  submissions: {
    get: (id: string) => apiClient.get(`/submissions/${id}`),
    create: (data: any) => apiClient.post('/submissions', data),
    update: (id: string, data: any) => apiClient.put(`/submissions/${id}`, data),
    accept: (id: string) => apiClient.post(`/submissions/${id}/accept`),
    reject: (id: string) => apiClient.post(`/submissions/${id}/reject`),
  },

  // Payments endpoints
  payments: {
    initiate: (data: any) => apiClient.post('/payments/initiate', data),
    get: (id: string) => apiClient.get(`/payments/${id}`),
    history: (page = 1, limit = 10) =>
      apiClient.get('/payments/history', { params: { page, limit } }),
  },

  // Users endpoints
  users: {
    get: (id: string) => apiClient.get(`/users/${id}`),
    update: (id: string, data: any) => apiClient.put(`/users/${id}`, data),
    profile: () => apiClient.get('/users/profile'),
  },
};

export default apiClient;
