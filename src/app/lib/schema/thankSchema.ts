import mongoose from "mongoose";

const ThankSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    contect: { type: String, required: true },
});

  export default ThankSchema