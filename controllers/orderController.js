const orderModel = require("../models/orderModel");

// create order
exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    console.log(orderData);
    const order = new orderModel(orderData);
    await order.save();

    res.status(201).json({
      status: "success",
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orderData = await orderModel
      .find()
      .populate({
        path: "customer",
        model: "Users",
      })
      .populate({
        path: "items.job",
        model: "Jobs",
        populate: {
          path: "worker",
          model: "Users",
        },
      });

    res.status(200).json({
      status: "success",
      data: orderData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

// get all orders by customer email
exports.getOrdersByCustomerEmail = async (req, res) => {
  try {
    const customerEmail = req.params.email;

    console.log(customerEmail);

    const orderData = await orderModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $lookup: {
          from: "jobs", // The name of the Jobs collection
          localField: "items.job",
          foreignField: "_id",
          as: "items.job",
        },
      },
      {
        $unwind: "$items.job",
      },
      {
        $lookup: {
          from: "users", // The name of the Users collection
          localField: "items.job.worker",
          foreignField: "_id",
          as: "items.job.worker",
        },
      },
      {
        $unwind: "$items.job.worker",
      },
      {
        $match: { "customer.email": customerEmail },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: orderData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the customer orders",
      error: error.message,
    });
  }
};

// get all orders by worker email
exports.getOrdersByWorkerEmail = async (req, res) => {
  try {
    const workerEmail = req.params.email; // Adjust the parameter name as needed

    const orderData = await orderModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $lookup: {
          from: "jobs",
          localField: "items.job",
          foreignField: "_id",
          as: "items.job",
        },
      },
      {
        $unwind: "$items.job",
      },
      {
        $lookup: {
          from: "users",
          localField: "items.job.worker",
          foreignField: "_id",
          as: "items.job.worker",
        },
      },
      {
        $unwind: "$items.job.worker",
      },
      {
        $match: { "items.job.worker.email": workerEmail },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: orderData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Can't get the orders by worker email",
      error: error.message,
    });
  }
};
