const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrdersByCustomerEmail,
  getOrdersByWorkerEmail,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/order", getAllOrders);
router.get("/order/customer/:email", getOrdersByCustomerEmail);
router.get("/order/worker/:email", getOrdersByWorkerEmail);
router.post("/order/create", createOrder);

module.exports = router;
