const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");

// add new job
exports.addJob = async (req, res) => {
  try {
    const { title, description, wage, category, status, location } = req.body;
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
      location,
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
    const jobData = await jobModel
      .find({
        status: { $nin: ["hired", "requested"] },
      })
      .populate("worker customer");
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

// Get requested jobs
exports.getRequestedJobs = async (req, res) => {
  try {
    const requestedJobData = await jobModel
      .find({ status: "requested" })
      .populate("worker customer");

    res.status(200).json({
      status: "success",
      data: requestedJobData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the requested jobs",
      error: error.message,
    });
  }
};

// Get job
exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobData = await jobModel.findById(jobId).populate("worker customer");
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

// Hire worker
exports.hireWorker = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { workerEmail, customerEmail } = req.body;

    // Find the worker by email
    const worker = await userModel.findOne({ email: workerEmail });

    if (!worker || worker.role !== "worker") {
      return res.status(404).json({
        status: "fail",
        message: "Invalid worker",
      });
    }

    // Find the customer by email
    const customer = await userModel.findOne({ email: customerEmail });

    if (!customer || customer.role !== "customer") {
      return res.status(404).json({
        status: "fail",
        message: "Invalid customer",
      });
    }

    // Update the job with the selected worker and customer
    const updatedJob = await jobModel
      .findByIdAndUpdate(
        jobId,
        { worker: worker._id, status: "hired", customer: customer._id },
        { new: true }
      )
      .populate("worker customer");

    res.status(200).json({
      status: "success",
      message: "Worker hired successfully",
      data: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Unable to hire worker",
      error: error.message,
    });
  }
};

// Post a specific job request to admin
exports.postJobToAdmin = async (req, res) => {
  try {
    const { title, description, category, userEmail } = req.body;

    // Find the customer who posted the job
    const customer = await userModel.findOne({ email: userEmail });

    if (!customer || customer.role !== "customer") {
      return res.status(404).json({
        status: "fail",
        message: "Invalid worker",
      });
    }

    // Create a new job document
    const newJob = new jobModel({
      title,
      description,
      category,
      status: "requested",
      customer: customer._id,
    });
    await newJob.save();

    res.status(201).json({
      status: "success",
      message: "Job request posted to admin successfully",
      data: newJob,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Unable to post job request",
      error: error.message,
    });
  }
};
