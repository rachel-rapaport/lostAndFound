import { FoundItem } from "@/app/types/props/foundItem";
import { LostItem } from "@/app/types/props/lostItem";
import axios from "axios"

export const matchLostFound = async (lostItem: LostItem, categoryId:string) => {
    // console.log("in server", lostItem);

    try {
        const response = await axios.post("/api/match/lost-found", {
            lostItem,
            categoryId, // Add categoryId to the request body
        })
        console.log(response.data.data);
        return response.data.data
    } catch (error) {
        throw new Error("Failed match lost to found", error)
    }
}

export const matchFoundLost = async (foundItem: FoundItem,categoryId:string) => {
    console.log("in server", foundItem);

    try {
        const response = await axios.post("/api/match/found-lost",{
            foundItem,
            categoryId
        } )
        console.log(response.data.data);
        return response.data.data
    } catch (error) {
        throw new Error("Failed match found to lost", error)
    }
}