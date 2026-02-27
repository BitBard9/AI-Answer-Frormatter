const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  originalContent: {
    type: String,
    required: true,
  },
  formattedAnswer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Analysis", analysisSchema);
