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

  // ROOMS
    rooms: "/rooms",
    roomTrash: "/rooms/trash",
    roomById: (id: string) => `/rooms/${id}`,
    roomRestore: (id: string) => `/rooms/${id}/restore`,  
    roomForceDelete: (id: string) => `/rooms/${id}/force-delete`,  
    
  // BEDS
   // BEDS
  beds: "/beds",
  bedTrash: "/beds/trash",
  bedById: (id: string) => `/beds/${id}`,
  bedRestore: (id: string) => `/beds/${id}/restore`,
  bedForceDelete: (id: string) => `/beds/${id}/force-delete`,
};