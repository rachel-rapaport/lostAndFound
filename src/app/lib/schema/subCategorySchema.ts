import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    categoryId: { type: String, required: true },
});

  export default SubCategorySchema