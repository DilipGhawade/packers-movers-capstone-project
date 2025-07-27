import mongoose from "mongoose";

const quickQuoteSchema = mongoose.Schema({
  movingFrom: {
    type: String,
    required: [true, "Please add moving frpm"],
  },
  movingTo: {
    type: String,
    required: [true, "Plese add where need to move"],
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
});

const QuickQuote = mongoose.model("QuickQuote", quickQuoteSchema);

export default QuickQuote;
