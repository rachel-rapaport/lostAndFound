import mongoose from "mongoose";

const TypePublicTransportSchema = new mongoose.Schema({
    title: { type: String, required: true },
});

  export default TypePublicTransportSchema