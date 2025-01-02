import axios from "axios";
import { FoundItem } from "../../types/props/foundItem";

// get all found items
export const getFoundItems = async () => {
  try {
    const response = await axios.get("/api/foundItem", {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting foundItems:", error);
    throw error;
  }
};

// get found item by id
export const getFoundItemById = async (id: string) => {
  try {
    const response = await axios.get(`/api/foundItem/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting found Item:", error);
    throw error;
  }
};

// create new found item
export const createFoundItem = async (foundItem: FoundItem) => {
  try {
    const response = await axios.post("/api/foundItem", foundItem);
    return response.data;
  } catch (error) {
    console.log("Error creating foundItem:", error);
    throw error;
  }
};

// update found item by id
export const updateFoundItemById = async (id: string, foundItem: FoundItem) => {
  try {
    const response = await axios.put(`/api/foundItem/${id}`, foundItem);
    return response.data;
  } catch (error) {
    console.log("Error updating foundItem:", error);
    throw error;
  }
};

// delete found item by id
export const deleteFoundItemById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/foundItem/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting foundItem", error);
    throw error;
  }
};