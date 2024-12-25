import userStore from "@/app/store/userStore";
import axios from "axios";

export const logout = async () => {
  try {
    const response = await axios.post("/api/logout");
    userStore.getState().setAlerts([]);
    return response.data;
  } catch (error) {
    console.log("Error creating foundItem:", error);
    throw error;
  }
};
