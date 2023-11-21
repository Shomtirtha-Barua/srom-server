const express = require("express");
const {
  addJob,
  getAllJobs,
  getJobById,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/job/:email", addJob);
router.get("/job", getAllJobs);
router.get("/job/:id", getJobById);
router.delete("/job/:id", deleteJob);

module.exports = router;
