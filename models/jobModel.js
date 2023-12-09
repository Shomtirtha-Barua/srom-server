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
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Jobs", jobSchema);

/* 
All possible types of Job Status
--------------------------------
   Open --> worker, 
   Completed --> worker, 
   Requested --> Customer,
   Hired --> Customer,
   Cancelled --> Both(optional)
*/
