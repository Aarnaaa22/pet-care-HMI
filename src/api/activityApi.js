// src/api/activityApi.js
import axios from "axios";
import { loadActivities, saveActivity, deleteActivity } from "../utils/storage";

export async function fetchActivities() {
  // Simulate network delay and return local IndexedDB storage
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await loadActivities();
      resolve({ data });
    }, 400);
  });
}

export async function logActivity(activityPayload) {
  return new Promise(async (resolve) => {
    const newActivity = {
      id: `act_${Date.now()}`,
      synced: true,
      ...activityPayload
    };
    const updatedList = await saveActivity(newActivity);
    setTimeout(() => {
      resolve({ data: newActivity, allActivities: updatedList });
    }, 300);
  });
}

export async function removeActivity(id) {
  return new Promise(async (resolve) => {
    const updatedList = await deleteActivity(id);
    setTimeout(() => {
      resolve({ data: { success: true, id }, allActivities: updatedList });
    }, 200);
  });
}
