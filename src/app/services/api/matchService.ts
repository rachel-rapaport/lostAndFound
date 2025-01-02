import { FoundItem } from "@/app/types/props/foundItem";
import { LostItem } from "@/app/types/props/lostItem";
import axios from "axios"

export const matchLostFound = async (lostItem: LostItem) => {
    console.log("in server", lostItem);

    try {
        const response = await axios.post("/api/match/lost-found", lostItem)
        console.log(response.data.data);
        return response.data.data
    } catch (error) {
        throw new Error("Failed match lost to found", error)
    }
}

export const matchFoundLost = async (foundItem: FoundItem) => {
    console.log("in server", foundItem);

    try {
        const response = await axios.post("/api/match/found-lost", foundItem)
        console.log(response.data.data);
        return response.data.data
    } catch (error) {
        throw new Error("Failed match found to lost", error)
    }
}