const express = require("express");
const {
  getAllUsers,
  createUser,
  getOneUser,
  getAdmin,
  getWorker,
} = require("../controllers/userController");
const router = express.Router();

router.post("/user", createUser);
router.get("/user", getAllUsers);
router.get("/user/:email", getOneUser);
router.get("/admin/:email", getAdmin);
router.get("/worker/:email", getWorker);

module.exports = router;
