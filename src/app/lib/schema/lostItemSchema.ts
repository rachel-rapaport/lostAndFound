import mongoose from "mongoose";
import PublicTransportSchema from "./publicTransportSchema";
import CircleSchema from "./circleSchema";

const LostItemSchema = new mongoose.Schema({
    subCategory: { type: String, required: true },
    colorId: { type: String, required: true },
    userId:{ type: String, required: true },
    circles: { type: [CircleSchema] },
    publicTransport: { type: PublicTransportSchema },
});

  export default LostItemSchema