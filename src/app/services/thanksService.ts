import axios from "axios";
import { Thank } from "../types/props/thank";

// get all thanks
export const getThanks = async () => {
  try {
    const response = await axios.get("/api/thank",{
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting thanks:", error);
    throw error;
  }
};



// get thank by id
export const getThankById = async (id: string) => {
  try {
    const response = await axios.get(`/api/thank/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting thank:", error);
    throw error;
  }
};

// create new thank
export const createThank = async (thank: Thank) => {
  try {
    const response = await axios.post("/api/thank", thank);
    return response.data;
  } catch (error) {
    console.log("Error creating thank:", error);
    throw error;
  }
};

// update thank by id
export const updateThankById = async (id: string, thank: Thank) => {
  try {
    const response = await axios.put(`/api/thank/${id}`, thank);
    return response.data;
  } catch (error) {
    console.log("Error updating thank:", error);
    throw error;
  }
};


// delete thank by id
export const deleteThankById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/thank/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting thank", error);
    throw error;
  }
};