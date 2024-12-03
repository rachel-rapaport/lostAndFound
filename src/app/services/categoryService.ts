import axios from "axios"

export const getCategories = async () => {
    try {
        const response = await axios.get('api/category');
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}


// try {
//     const response = await axios.get("/api/get",{
//       withCredentials: true,
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error("Error getting recipe:", error);
//     throw error;
//   }