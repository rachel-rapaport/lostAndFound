import axios from "axios"

export const getCities = async ()=>{
    try{
        const response= await axios.get("api/city");
        console.log(response.data.data);
        return response.data.data;
    }catch{
        throw new Error("Failed to get cities")
    }
}