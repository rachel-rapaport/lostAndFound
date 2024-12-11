import axios from "axios";

export const verifyToken = async () => {
  try {
    const response = await axios.get("/api/check-token");
    console.log("Token is valid:", response.data);
    return response.data;
  } catch (error) {
    console.log("No valid token:", error);
    throw error;
  }
};
