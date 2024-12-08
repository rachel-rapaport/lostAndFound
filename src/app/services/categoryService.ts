import axios from "axios";
import { Category } from "../types/category";

// get all categorys
export const getCategorys = async () => {
  try {
    const response = await axios.get("/api/category",{
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting categorys:", error);
    throw error;
  }
};



// get category by id
export const getCategoryById = async (id: string) => {
  try {
    const response = await axios.get(`/api/category/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting category:", error);
    throw error;
  }
};

// create new category
export const createCategory = async (category: Category) => {
  try {
    const response = await axios.post("/api/category", category);
    return response.data;
  } catch (error) {
    console.log("Error creating category:", error);
    throw error;
  }
};

// update category by id
export const updateCategoryById = async (id: string, category: Category) => {
  try {
    const response = await axios.put(`/api/category/${id}`, category);
    return response.data;
  } catch (error) {
    console.log("Error updating category:", error);
    throw error;
  }
};


// delete category by id
export const deleteCategoryById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/category/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting category", error);
    throw error;
  }
};