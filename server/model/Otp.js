const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  otp: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
});

module.exports = mongoose.model("Otp", otpSchema);
