import mongoose from "mongoose";
import PostionSchema from "./postionSchema";
import PublicTransportSchema from "./publicTransportSchema";
import QuestionSchema from "./questionSchema";

const FoundItemSchema = new mongoose.Schema({
  subCategoryId: { type: String, required: true },
  userId: { type: String, required: true },
  colorId: { type: String, required: true },
  postion: { type: PostionSchema, required: true },
  publicTransport: { type: PublicTransportSchema },
  image: { type: String },
  descripition: { type: String },
  questions: { type: [QuestionSchema], required: true },
});
export default FoundItemSchema;
