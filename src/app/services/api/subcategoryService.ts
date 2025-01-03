import axios from "axios";
import { getCategoryById } from "./categoryService";
import { SubCategory } from "@/app/types/props/subCategory";

export const createSubCategory = async (subCategory:SubCategory) => {
  try {
    // Check if the category exists
    const response = await getCategoryById(subCategory.categoryId._id.toString());
    if (!response) {
      throw new Error("Category does not exist");
    }

    // Create the new subcategory
    const newSubCategory = await axios.post("api/sub-category", subCategory);

    console.log(newSubCategory.data);
    return newSubCategory.data;
  } catch (error) {
    console.error("Failed to create subcategory", error);
    throw new Error("Failed to create subcategory");
  }
};


// get color by id
export const getSubCategoryById = async (id: string) => {
  try {
    const response = await axios.get(`/api/sub-category/${id}`);
    console.log(response);
    return response.data;
  } catch {
    throw new Error("Failed to get subcategory by id")
  }
};