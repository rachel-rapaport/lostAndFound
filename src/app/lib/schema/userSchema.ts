import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    lostItems: { type: [String], required: true },
    foundItems: { type: [String], required: true },
    blockedItems: { type: [String], required: true },
    notifications: { type: [String], required: true }
});

  export default UserSchema