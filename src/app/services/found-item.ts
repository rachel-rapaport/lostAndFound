import axios from "axios";
import { FoundItem } from "../types/foundItem";

export const createFoundItem = async (foundItem: FoundItem) => {
    try {
        const response = await axios.post("/api/found-item", foundItem);
        return response.data;
    } catch (error) {
        console.log("Error creating found item:", error);
        throw error;
    }
}  