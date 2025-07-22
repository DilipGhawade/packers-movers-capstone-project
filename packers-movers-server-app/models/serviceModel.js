import mongoose from "mongoose";

const serviceSchem = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Add a service title"],
  },
  description: {
    type: String,
    required: [true, "Add the service description"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please upload an image"],
  },
});

const Service = mongoose.model("Service", serviceSchem);

export default Service;
