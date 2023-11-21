const express = require("express");
const {
  createService,
  getAllServices,
  getServiceById,
  setDiscount,
  toggleIsHidden,
  removeService,
} = require("../controllers/serviceController");

const router = express.Router();

router.post("/service", createService);
router.get("/service", getAllServices);
router.get("/service/:id", getServiceById);
router.patch("/service/:id/setDiscount", setDiscount);
router.patch("/service/:id/toggleIsHidden", toggleIsHidden);
router.delete("/service/:id", removeService);

module.exports = router;
