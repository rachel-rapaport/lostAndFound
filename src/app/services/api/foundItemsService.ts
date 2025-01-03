import { Category } from "@/app/types/props/category";
import { FoundItem } from "../../types/props/foundItem";
import axios from "axios";

// get all found items
export const getFoundItems = async () => {
  try {
    const response = await axios.get("/api/foundItem",{
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch{
    throw new Error("Failed to get foundItems");
  }
};

//get foundItem by id
export const getFoundItemById = async (id: string) => {
  try {
    const response = await axios.get(`/api/foundItem/${id}`);
    console.log(response);
    return response.data;
  } catch{
    throw new Error("Failed to get foundItem");
  }
};

// create new found item
export const createFoundItem = async (foundItem: FoundItem,
  currentCategory: Category) => {
  try {
    const response = await axios.post("/api/foundItem",  {
      ...foundItem,
      category: currentCategory, 
    });
    return response.data;
  } catch {
    throw new Error("Failed to get foundItems");
  }
};
// export const createFoundItem = async (foundItemData: FoundItem) => {
//   const { publicTransport, ...foundItemRest } = foundItemData;
//   const publicTransportData = await TypePublicTransportModel.create(
//     publicTransport
//   );

//   const foundItem = new FoundItemModel({
//     ...foundItemRest,
//     publicTransport: publicTransportData._id,
//   });

//   return await foundItem.save();
// };


// update found item by id
export const updateFoundItemById = async (id: string, foundItem: FoundItem) => {
  try {
    const response = await axios.put(`/api/foundItem/${id}`, foundItem);
    return response.data;
  } catch{
    throw new Error("Failed to updating foundItem");
  }
};


// delete found item by id
export const deleteFoundItemById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/foundItem/${id}`);
    return response.data;
  } catch{
    throw new Error("Failed to deleting foundItem")
  }
};

