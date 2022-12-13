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
    minLength: [3, "Date must be in mm/dd/yyyy format!"],
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