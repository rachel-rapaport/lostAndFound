import axios from "axios";

export const logout = async () => {
  try {
    const response = await axios.post("/api/logout");
    
    return response.data;
  } catch (error) {
    console.log("Error creating foundItem:", error);
    throw error;
  }
};