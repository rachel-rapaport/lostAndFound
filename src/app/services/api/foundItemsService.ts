import { FoundItemRequest } from "@/app/types/request/foundItemRequest";
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
  } catch (error) {
    console.error("Error getting foundItems:", error);
    throw error;
  }
};
// export const getFoundItems = async () => {
//   return await FoundItemModel.find()
//     .populate("userId")
//     .populate("publicTransport")
//     .populate("colorId");
// };

// get found item by id
export const getFoundItemById = async (id: string) => {
  try {
    const response = await axios.get(`/api/foundItem/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting found Item:", error);
    throw error;
  }
};
// export const getFoundItemById = async (id: string) => {
//   return await FoundItemModel.findById(id)
//     .populate("circles")
//     .populate("publicTransport");
// };

// create new found item
export const createFoundItem = async (foundItem: FoundItemRequest) => {
  try {
    const response = await axios.post("/api/foundItem", foundItem);
    console.log(response.data.data[0]);
    return response.data.data[0];
  } catch (error) {
    throw new Error("Failed to create foundItem");

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
  } catch (error) {
    console.log("Error updating foundItem:", error);
    throw error;
  }
};
// export const updateFoundItemById = async (
//   id: string,
//   updateData: FoundItem
// ) => {
//   const { publicTransport, ...foundItemRest } = updateData;
//   let publicTransportData = undefined;

//   if (publicTransport) {
//     publicTransportData = await TypePublicTransportModel.create(
//       publicTransport
//     );
//   }

//   const updatedFoundItem = await FoundItemModel.findByIdAndUpdate(
//     id,
//     {
//       ...foundItemRest,
//       publicTransport: publicTransportData
//         ? publicTransportData._id
//         : undefined,
//     },
//     { new: true }
//   )
//     .populate("circles")
//     .populate("publicTransport");

//   return updatedFoundItem;
// };

// delete found item by id
export const deleteFoundItemById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/foundItem/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting foundItem", error);
    throw error;
  }
};

// export const deleteFoundItemById = async (id: string) => {
//   const deleteFoundItem = await FoundItemModel.findByIdAndDelete(id);
//   if (!deleteFoundItem) {
//     return null;
//   }

//   return deleteFoundItem;
// };
