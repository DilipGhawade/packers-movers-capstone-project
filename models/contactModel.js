import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name "],
  },
  email: {
    type: String,
    required: [true, "Pleae enter your emial id"],
  },
  mobileNmber: {
    type: String,
    required: [
      true,
      "Please provide your mobilbe number for contact our team will get back to you on call",
    ],
  },
  message: {
    type: String,
    required: [true, "provide the detailed about your concern"],
    maxLength: [230, "wirte you messge to better understanding "],
  },
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
