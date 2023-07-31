const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 100,
    required: [true, "Name is required!"],
  },
  address: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 200,
    required: [true, "Address is required!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;
