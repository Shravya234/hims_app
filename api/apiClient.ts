import axios from "axios";

// 🔥 Use your system IP if testing on mobile device
// Example: http://192.168.1.10:8000/api
export const baseURL = "http://192.168.1.6:8000/api";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================
// ALL ENDPOINTS HERE
// =====================
export const endpoint = {
  // WARDS
  wards: "/wards",
  wardTrash: "/wards/trash",
  wardById: (id: string) => `/wards/${id}`,
  wardRestore: (id: string) => `/wards/${id}/restore`,
};