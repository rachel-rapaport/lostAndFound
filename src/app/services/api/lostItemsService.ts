import axios from "axios";
import { LostItem } from "../../types/props/lostItem";

// get all lost items
export const getLostItems = async () => {
  try {
    const response = await axios.get("/api/lostItem",{
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting lostItems:", error);
    throw error;
  }
};


// get lost item by id
export const getLostItemById = async (id: string) => {
  try {
    const response = await axios.get(`/api/lostItem/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting lost Item:", error);
    throw error;
  }
};

// create new lost item
export const createLostItem = async (lostItem: LostItem) => {
  try {
    const response = await axios.post("/api/lostItem", lostItem);
    return response.data;
  } catch (error) {
    console.log("Error creating lostItem:", error);
    throw error;
  }
};

// update lost item by id
export const updateLostItemById = async (id: string, lostItem: LostItem) => {
  try {
    const response = await axios.put(`/api/lostItem/${id}`, lostItem);
    return response.data;
  } catch (error) {
    console.log("Error updating lostItem:", error);
    throw error;
  }
};

// delete lost item by id
export const deleteLostItemById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/lostItem/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting lostItem", error);
    throw error;
  }
};