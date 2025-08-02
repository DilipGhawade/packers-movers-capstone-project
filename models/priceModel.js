import mongoose from "mongoose";

const priceSchema = mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
  description: String,
});

const Price = mongoose.model("Price", priceSchema);
export default Price;
