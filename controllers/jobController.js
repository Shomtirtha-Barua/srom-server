const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");

// add new job
exports.addJob = async (req, res) => {
  try {
    const { title, description, wage, category, status } = req.body;
    const { email } = req.params;

    // Find the worker by email
    const worker = await userModel.findOne({ email });

    if (!worker) {
      return res.status(404).json({
        status: "fail",
        message: "Worker not found",
      });
    }

    // Use the found workerId
    const workerId = worker._id;

    // Create a new job document
    const newJob = new jobModel({
      title,
      description,
      wage,
      category,
      status,
      worker: workerId,
    });
    await newJob.save();

    // Populate the 'user' field with user data by querying the job
    const populatedJob = await jobModel.findById(newJob._id).populate("worker");

    res.status(201).json({
      status: "success",
      message: "Job added successfully",
      data: populatedJob,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Data not inserted",
      error: error.message,
    });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobData = await jobModel.find().populate("worker");
    res.status(200).json({
      status: "success",
      data: jobData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

// Get job
exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobData = await jobModel.findById(jobId).populate("worker");
    res.status(200).json({
      status: "success",
      data: jobData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

// delete job
exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await jobModel.findByIdAndRemove(jobId);

    if (!deletedJob) {
      return res.status(404).json({
        status: "fail",
        message: "Job not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Job deleted successfully",
      data: deletedJob,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to delete the job",
      error: error.message,
    });
  }
};
