import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    categoryId: { type: String, required: true },
    lostItems: { type: [mongoose.Schema.Types.ObjectId], ref: "LostItem", default: [] },
    foundItems: { type: [mongoose.Schema.Types.ObjectId], ref: "FoundItem", default: [] },
});

export default SubCategorySchema;