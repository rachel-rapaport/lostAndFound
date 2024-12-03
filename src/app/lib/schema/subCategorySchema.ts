import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    categoryId: { type: String, required: true },
    lostItems: { type: mongoose.Schema.Types.ObjectId , ref: "LostItem"},
    foundItems: { type: mongoose.Schema.Types.ObjectId, ref: "FoundItem" },
});

  export default SubCategorySchema