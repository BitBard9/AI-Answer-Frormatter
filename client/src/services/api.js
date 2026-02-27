import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Analyze text
export const analyzeText = async (topic, content) => {
  const response = await api.post("/analyze", { topic, content });
  return response.data;
};

// Get history
export const getHistory = async (page = 1, limit = 20) => {
  const response = await api.get(`/history?page=${page}&limit=${limit}`);
  return response.data;
};

// Get analysis by ID
export const getAnalysisById = async (id) => {
  const response = await api.get(`/history/${id}`);
  return response.data;
};

// Delete analysis
export const deleteAnalysis = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};

// Refine answer
export const refineAnswer = async (id, refinementInstructions) => {
  const response = await api.post(`/refine/${id}`, { refinementInstructions });
  return response.data;
};

export default api;
