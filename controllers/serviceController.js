const serviceModel = require("../models/serviceModel");

// create new service
exports.createService = async (req, res) => {
  try {
    const serviceData = req.body;
    const service = new serviceModel(serviceData);
    await service.save();
    res.status(201).json({
      status: "success",
      message: "Service created successfully",
      data: serviceData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Data not inserted",
      error: error.message,
    });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const serviceData = await serviceModel.find();
    res.status(200).json({
      status: "success",
      data: serviceData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

// Get service
exports.getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const serviceData = await serviceModel.findById(serviceId);
    res.status(200).json({
      status: "success",
      data: serviceData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

// Set discount for a service by ID
exports.setDiscount = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { discount } = req.body;

    // Find the service by ID and update the discount field
    const serviceData = await serviceModel.findByIdAndUpdate(
      serviceId,
      { discounts: discount },
      { new: true } // Return the updated document
    );

    if (!serviceData) {
      return res.status(404).json({
        status: "fail",
        message: "Service not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Discount set successfully",
      data: serviceData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Unable to set discount",
      error: error.message,
    });
  }
};

// Toggle the "isHidden" status of a service by ID
exports.toggleIsHidden = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { isHidden } = req.body;

    // Find the service by ID and update the isHidden field
    const serviceData = await serviceModel.findByIdAndUpdate(
      serviceId,
      { isHidden },
      { new: true } // Return the updated document
    );

    if (!serviceData) {
      return res.status(404).json({
        status: "fail",
        message: "Service not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: `Service is now ${isHidden ? "hidden" : "visible"}`,
      data: serviceData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Unable to toggle isHidden status",
      error: error.message,
    });
  }
};

// Remove a service by ID
exports.removeService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const serviceData = await serviceModel.findByIdAndRemove(serviceId);

    if (!serviceData) {
      return res.status(404).json({
        status: "fail",
        message: "Service not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Service deleted successfully",
      data: serviceData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Unable to deleted the service",
      error: error.message,
    });
  }
};
