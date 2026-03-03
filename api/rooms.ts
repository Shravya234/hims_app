import {apiClient,endpoint} from "./apiClient";

export async function getRoomList() {
  const response = await apiClient.get(endpoint.rooms);
  return response.data;
}

export async function getTrashRoom() {
  const response = await apiClient.get(endpoint.roomTrash);
  return response.data;
}

export async function createRoom(data: any) {
  const response = await apiClient.post(endpoint.rooms, data);
  return response.data;
}

export async function updateRoom(id: string, data: any) {
  const response = await apiClient.put(`/rooms/${id}`, data);
  return response.data;
}

export async function deleteRoom(id: string) {
  const response = await apiClient.delete(`/rooms/${id}`);
  return response.data;
}

export async function restoreRoom(id: string) {
  const response = await apiClient.put(`${endpoint.roomRestore(id)}`);
  return response.data;
}

export async function forceDeleteRoom(id: string) {
  const response = await apiClient.delete(`${endpoint.roomById(id)}/force-delete`);
  return response.data;
}