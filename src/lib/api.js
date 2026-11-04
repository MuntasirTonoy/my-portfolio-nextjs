// Browser-side API client. Auth uses an httpOnly session cookie set by the
// server, so no token is stored or attached here.
import axios from "axios";

const api = axios.create({ baseURL: "/api" });

const data = (request) => request.then((res) => res.data);

/** Extracts a user-facing message from an axios error. */
export const errorMessage = (error, fallback = "Something went wrong. Please try again.") =>
  error?.response?.data?.message || fallback;

// Portfolio
export const fetchPortfolio = () => data(api.get("/portfolio"));
export const updateSection = (section, body) => data(api.put(`/portfolio/${section}`, body));

// Auth
export const loginAdmin = (credentials) => data(api.post("/auth/login", credentials));
export const logoutAdmin = () => data(api.post("/auth/logout"));
export const fetchCurrentAdmin = () => data(api.get("/auth/me"));
export const updateAccount = (body) => data(api.put("/auth/password", body));
export const forgotPassword = (body) => data(api.post("/auth/forgot-password", body));
export const resetPassword = (body) => data(api.post("/auth/reset-password", body));

// Reviews
export const fetchAllReviews = () => data(api.get("/reviews", { params: { all: true } }));
export const createReview = (body) => data(api.post("/reviews", body));
export const deleteReview = (id) => data(api.delete(`/reviews/${id}`));
export const updateReviewStatus = (id, isPublished) =>
  data(api.put(`/reviews/${id}`, { isPublished }));

// Uploads
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return data(api.post("/upload", formData));
};
