import axios from "axios";
import { Color } from "../../types/props/color";

// get all colors
export const getColors = async () => {
  try {
    const response = await axios.get("/api/color",{
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting colors:", error);
    throw error;
  }
};



// get color by id
export const getColorById = async (id: string) => {
  try {
    const response = await axios.get(`/api/color/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting color:", error);
    throw error;
  }
};

// create new color
export const createColor = async (color: Color) => {
  try {
    const response = await axios.post("/api/color", color);
    return response.data;
  } catch (error) {
    console.log("Error creating color:", error);
    throw error;
  }
};

// update color by id
export const updateColorById = async (id: string, color: Color) => {
  try {
    const response = await axios.put(`/api/color/${id}`, color);
    return response.data;
  } catch (error) {
    console.log("Error updating color:", error);
    throw error;
  }
};


// delete color by id
export const deleteColorById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/color/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting color", error);
    throw error;
  }
};