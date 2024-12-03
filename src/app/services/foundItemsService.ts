import FoundItemModel from "../lib/models/foundItem";
import TypePublicTransportModel from "../lib/models/typePublicTransport";
import { FoundItem } from "../types/foundItem";

// get all found items
export const getFoundItems = async () => {
  return await FoundItemModel.find()
    .populate("circles")
    .populate("publicTransport");
};


// get found item by id
export const getFoundItemById = async (id: string) => {
  return await FoundItemModel.findById(id)
    .populate("circles")
    .populate("publicTransport");
};

// create new found item
export const createFoundItem = async (foundItemData: FoundItem) => {
  const { publicTransport, ...foundItemRest } = foundItemData;
  const publicTransportData = await TypePublicTransportModel.create(
    publicTransport
  );

  const foundItem = new FoundItemModel({
    ...foundItemRest,
    publicTransport: publicTransportData._id,
  });

  return await foundItem.save();
};

// update found item by id
export const updateFoundItemById = async (id: string, updateData: FoundItem) => {
  const { publicTransport, ...foundItemRest } = updateData;
  let publicTransportData = undefined;

  if (publicTransport) {
    publicTransportData = await TypePublicTransportModel.create(
      publicTransport
    );
  }

  const updatedFoundItem = await FoundItemModel.findByIdAndUpdate(
    id,
    {
      ...foundItemRest,
      publicTransport: publicTransportData
        ? publicTransportData._id
        : undefined,
    },
    { new: true }
  )
    .populate("circles")
    .populate("publicTransport");

  return updatedFoundItem;
};

// delete found item by id
export const deleteFoundItemById = async (id: string) => {
  const deleteFoundItem = await FoundItemModel.findByIdAndDelete(id);
  if (!deleteFoundItem) {
    return null;
  }

  return deleteFoundItem;
};
