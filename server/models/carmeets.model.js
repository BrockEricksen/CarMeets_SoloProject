const mongoose = require("mongoose");

const CarMeetSchema = {
  meetName: {
    type: String,
    required: [true, "Name is required!"],
    minLength: [3, "Name must be at least 3 characters!"],
  },

  meetHost: {
    type: String,
    required: [true, "Host is required!"],
    minLength: [3, "Host must be at least 3 characters!"],
  },

  meetLocation: {
    type: String,
    required: [true, "Location is required!"],
    minLength: [3, "Location must be at least 3 characters!"],
  },

  meetDate: {
    type: String,
    required: [true, "Date is required!"],
    minLength: [6, "Date must be in month/day/year format!"],
    // min: Date.now(),
    // max: 2030-01-01,  was getting weird bug so for now disabled
  },

  meetTime: {
    type: String,
    required: [true, "Time is required!"],
    minLength: [3, "Time for meet is required!"],
  },

  description: {
    type: String,
    required: [true, "Description is required!"],
    minLength: [3, "Description must be at least 3 characters!"],
  },

  socials: {
    type: String,
    required: [false],
  },
};

module.exports = mongoose.model("Meet", CarMeetSchema);