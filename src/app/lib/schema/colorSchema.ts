import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    groupId: { type: Number, required: true },
});

  export default ColorSchema