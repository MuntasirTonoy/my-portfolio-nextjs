import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const fetchPortfolio = async () => {
  const response = await api.get("/portfolio");
  return response.data;
};

// Helper alias for backward compatibility
export const fetchProjects = async () => {
  const data = await fetchPortfolio();
  return data.projects || [];
};

export const updateSection = async (section, data) => {
  const response = await api.put(`/portfolio/${section}`, data);
  return response.data;
};

export const loginAdmin = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const updateAccountPassword = async (data) => {
  const response = await api.put("/auth/password", data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};

// Reviews
export const fetchReviews = async (all = false) => {
  const response = await api.get(`/reviews?all=${all}`);
  return response.data;
};

export const createReview = async (data) => {
  const response = await api.post("/reviews", data);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await api.delete(`/reviews/${id}`);
  return response.data;
};

export const updateReviewStatus = async (id, isPublished) => {
  const response = await api.put(`/reviews/${id}`, { isPublished });
  return response.data;
};

export const uploadImage = async (formData) => {
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;
