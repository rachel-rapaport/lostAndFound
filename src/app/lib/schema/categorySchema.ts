import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  subCategories: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: "SubCategory" }
});

export default CategorySchema;