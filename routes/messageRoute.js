const express = require("express");
const {
  messageCustomer,
  getMessages,
  getConversations,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/messages/customer", messageCustomer);
router.get("/messages", getMessages);
router.get("/messages/:senderId/:receiverId", getConversations);

module.exports = router;
