import axios from "axios";

// create new alert
export const createAlert = async (userId: string,massage:string,link:string) => {
    try {
        const newAlert = {
            "message": massage,
            "link":link,
            "userId": userId,
            "read": false
        }
        const response = await axios.post("/api/alert", newAlert);

        return response.data;
    } catch (error) {
        console.log("Error creating alert:", error);
        throw error;
    }
};