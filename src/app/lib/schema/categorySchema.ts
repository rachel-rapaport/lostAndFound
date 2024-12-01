import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    subCategories: { type: [String], required: true },
});

  export default CategorySchema