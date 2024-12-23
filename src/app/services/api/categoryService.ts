import axios from "axios";
import { Category } from "../../types/props/category";

export const getCategories = async () => {
    try {
        const response = await axios.get('api/category');
        console.log(response.data.data);
        return response.data.data;
    }
    catch {
        throw new Error("Failed to get categories")
    }
}

export const getCategoryById = async (id: string) => {
    try {
        const response = await axios.get(`api/category/${id}`);
        return response.data.data;
    }
    catch {
        throw new Error("Failed to get category by id")
    }
}

export const addCategory = async (category: Category) => {
    try {
        const response = await axios.post('api/category', category);
        console.log(response.data);
        return response.data;
    }
    catch {
        throw new Error("Failed to add category")
    }
}