import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is requied"],
    maxLength: [60, "Frist name can not be exceed 60 character"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    maxLength: [60, "Last name can not be exceed 60 character"],
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email id "],
    unique: true,
    trim: true,
    lowercase: true,
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [8, "password must be at least 8 character"],
  },
  mobileNumber: {
    type: String,
    required: [false, ""],
    trim: true,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
