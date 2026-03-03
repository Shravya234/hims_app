import { apiClient, endpoint } from "./apiClient";

// ===============================
// GET  BEDS
// ===============================
export async function getBedList() {
  try {
    const response = await apiClient.get(endpoint.beds);
    return response.data.data; 
  } catch (error: any) {
    console.error("Get Bed Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}

// ===============================
// GET DELETED BEDS
// ===============================
export async function getTrashBed() {
  try {
    const response = await apiClient.get(endpoint.bedTrash);
    return response.data.data;
  } catch (error: any) {
    console.error("Trash Bed Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}

// ===============================
// CREATE BED
// ===============================
export async function createBed(data: any) {
  try {
    const response = await apiClient.post(
      endpoint.beds,
      data
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Create Bed Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}

// ===============================
// UPDATE BED
// ===============================
export async function updateBed(
  id: string,
  data: any
) {
  try {
    const response = await apiClient.put(
      endpoint.bedById(id),
      data
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Update Bed Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}

// ===============================
// SOFT DELETE BED
// ===============================
export async function deleteBed(id: string) {
  try {
    const response = await apiClient.delete(
      endpoint.bedById(id)
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Delete Bed Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}

// ===============================
// RESTORE BED
// ===============================
export async function restoreBed(id: string) {
  try {
    const response = await apiClient.put(
      endpoint.bedRestore(id)
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Restore Bed Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}

// ===============================
// PERMANENT DELETE BED (HARD DELETE)
// ===============================
export async function permanentDeleteBed(id: string) {
  try {
    const response = await apiClient.delete(
      endpoint.bedForceDelete(id)
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Permanent Delete Bed Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}