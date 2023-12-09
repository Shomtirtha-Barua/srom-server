const messageModel = require("../models/messageModel");

// sending message both customer and worker
exports.messageCustomer = async (req, res) => {
  try {
    const { senderId, customerId, messageContent } = req.body;

    // Create a new message document
    const newMessage = new messageModel({
      sender: senderId,
      recipient: customerId,
      content: messageContent,
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({
      status: "success",
      message: "Message sent to the customer",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to send the message to the customer",
      error: error.message,
    });
  }
};

// get message list
exports.getMessages = async (req, res) => {
  try {
    // Query all messages and populate the 'recipient' field with user data
    const messages = await messageModel.find().populate("sender recipient");

    res.status(200).json({
      status: "success",
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to retrieve messages with user data",
      error: error.message,
    });
  }
};

// get conversation
exports.getConversations = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    // Fetch conversations between sender and receiver
    const conversations = await messageModel
      .find({
        $or: [
          { sender: senderId, recipient: receiverId },
          { sender: receiverId, recipient: senderId },
        ],
      })
      .populate("sender recipient");

    res.status(200).json({
      status: "success",
      data: conversations,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to retrieve conversations",
      error: error.message,
    });
  }
};


// message to worker (customer to worker)
exports.messageWorker = async (req, res) => {
  try {
    const { senderId, workerId, messageContent } = req.body;

    // Create a new message document
    const newMessage = new messageModel({
      sender: senderId,
      recipient: workerId,
      content: messageContent,
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({
      status: "success",
      message: "Message sent to the worker",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to send the message to the worker",
      error: error.message,
    });
  }
};