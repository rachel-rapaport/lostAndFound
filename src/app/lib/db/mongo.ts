import mongoose from "mongoose";
import LostItemModel from "../models/lostItem";
import FoundItemModel from "../models/foundItem";

const MONGODB_URI = process.env.MONGODB_URI || "";

let isConnected = false;

const connect = async () => {
  if (isConnected) {
    // If there is already connection to MongoDB - prevents another connection
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    const db = await mongoose.connect(MONGODB_URI);
    // If readyState is equal to 1, it indicates that the connection is active
    isConnected = db.connection.readyState === 1;
    console.log("MongoDB connected successfully");
    console.log(LostItemModel);
    console.log(FoundItemModel);
  } catch (error) {
    throw new Error("Error in connecting to MongoDB" + error);
  }
};

export default connect;
