const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    wage: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Jobs", jobSchema);
