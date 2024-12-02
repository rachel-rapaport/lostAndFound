import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
});

export default SubCategorySchema;