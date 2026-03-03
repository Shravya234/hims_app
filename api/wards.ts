import { apiClient, endpoint } from "./apiClient";

// ===============================
// GET ACTIVE WARDS
// ===============================
export async function getWardList() {
  try {
    const response = await apiClient.get(endpoint.wards);
    return response.data;
  } catch (error: any) {
    console.error("Get Ward Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}

// ===============================
// GET DELETED WARDS
// ===============================
export async function getTrashWard() {
  try {
    const response = await apiClient.get(endpoint.wardTrash);
    return response.data;
  } catch (error: any) {
    console.error("Trash Ward Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}

// ===============================
// CREATE WARD
// ===============================
export async function createWard(data: any) {
  const response = await apiClient.post("/wards", data);
  return response.data;
}

// ===============================
// UPDATE WARD
// ===============================
export async function updateWard(id: string, data: any) {
  const response = await apiClient.put(`/wards/${id}`, data);
  return response.data;
}

// ===============================
// SOFT DELETE WARD
// ===============================
export async function deleteWard(id: string) {
  try {
    const response = await apiClient.delete(
      endpoint.wardById(id)
    );
    return response.data;
  } catch (error: any) {
    console.error("Delete Ward Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}

// ===============================
// RESTORE WARD
// ===============================
export async function restoreWard(id: string) {
  try {
    const response = await apiClient.put(
      endpoint.wardRestore(id)
    );
    return response.data;
  } catch (error: any) {
    console.error("Restore Ward Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}

// ===============================
// FORCE DELETE WARD
// ===============================
export async function forceDeleteWard(id: string) {
  try {
    const response = await apiClient.delete(
      `/wards/${id}/force-delete`
    );
    return response.data;
  } catch (error: any) {
    console.error("Force Delete Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}