import axios from "axios";
import { SubCategory } from "../types/subCategory";

// get all subCategorys
export const getSubCategorys = async () => {
  try {
    const response = await axios.get("/api/sub-category",{
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting subCategorys:", error);
    throw error;
  }
};



// get subCategory by id
export const getSubCategoryById = async (id: string) => {
  try {
    const response = await axios.get(`/api/sub-category/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting subCategory:", error);
    throw error;
  }
};

// create new subCategory
export const createSubCategory = async (subCategory: SubCategory) => {
  try {
    const response = await axios.post("/api/sub-category", subCategory);
    return response.data;
  } catch (error) {
    console.log("Error creating subCategory:", error);
    throw error;
  }
};

// update subCategory by id
export const updateSubCategoryById = async (id: string, subCategory: SubCategory) => {
  try {
    const response = await axios.put(`/api/sub-category/${id}`, subCategory);
    return response.data;
  } catch (error) {
    console.log("Error updating subCategory:", error);
    throw error;
  }
};


// delete subCategory by id
export const deleteSubCategoryById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/sub-category/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting subCategory", error);
    throw error;
  }
};