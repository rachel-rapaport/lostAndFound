import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    lostItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "LostItem", required: true }],
    foundItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoundItem", required: true }], 
    blockedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoundItem", required: true }],
    notifications: { type: [String], required: true }
});

  export default UserSchema