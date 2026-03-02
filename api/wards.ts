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
  try {
    const response = await apiClient.post(
      endpoint.wards,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Create Ward Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
}

// ===============================
// UPDATE WARD
// ===============================
export async function updateWard(
  id: string,
  data: any
) {
  try {
    const response = await apiClient.put(
      endpoint.wardById(id),
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Update Ward Error:", error);
    throw new Error(
      error.response?.data?.message || "Network error"
    );
  }
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