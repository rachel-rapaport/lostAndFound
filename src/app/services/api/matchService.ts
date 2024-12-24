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