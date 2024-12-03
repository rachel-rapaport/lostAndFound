import LostItemModel from "../lib/models/lostItem";
import TypePublicTransportModel from "../lib/models/typePublicTransport";
import { LostItem } from "../types/lostItem";

// get all lost items
export const getLostItems = async () => {
  return await LostItemModel.find()
    .populate("circles")
    .populate("publicTransport");
};


// get lost item by id
export const getLostItemById = async (id: string) => {
  return await LostItemModel.findById(id)
    .populate("circles")
    .populate("publicTransport");
};

// create new lost item
export const createLostItem = async (lostItemData: LostItem) => {
  const { publicTransport, ...lostItemRest } = lostItemData;
  const publicTransportData = await TypePublicTransportModel.create(
    publicTransport
  );

  const lostItem = new LostItemModel({
    ...lostItemRest,
    publicTransport: publicTransportData._id,
  });

  return await lostItem.save();
};

// update lost item by id
export const updateLostItemById = async (id: string, updateData: LostItem) => {
  const { publicTransport, ...lostItemRest } = updateData;
  let publicTransportData = undefined;

  if (publicTransport) {
    publicTransportData = await TypePublicTransportModel.create(
      publicTransport
    );
  }

  const updatedLostItem = await LostItemModel.findByIdAndUpdate(
    id,
    {
      ...lostItemRest,
      publicTransport: publicTransportData
        ? publicTransportData._id
        : undefined,
    },
    { new: true }
  )
    .populate("circles")
    .populate("publicTransport");

  return updatedLostItem;
};

// delete lost item by id
export const deleteLostItemById = async (id: string) => {
  const deleteLostItem = await LostItemModel.findByIdAndDelete(id);
  if (!deleteLostItem) {
    return null;
  }

  return deleteLostItem;
};
