import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  subCategories: { type: [String], default: [] }
});

export default CategorySchema;