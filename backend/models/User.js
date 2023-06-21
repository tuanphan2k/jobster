import mongoose from "mongoose";
import { EMAIL_REGEX } from "../constants/regex.js";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 8,
    maxlength: 55,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [EMAIL_REGEX, "Please provide valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
