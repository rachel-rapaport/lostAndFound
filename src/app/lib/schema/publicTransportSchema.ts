import mongoose from "mongoose";

const PublicTransportSchema = new mongoose.Schema({
    typePublicTransportId: { type: String, required: true },
    city: { type: String, required: true },
    line: { type: String, required: true },
});

export default PublicTransportSchema