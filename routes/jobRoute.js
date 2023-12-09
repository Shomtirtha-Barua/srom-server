const express = require("express");
const {
  addJob,
  getAllJobs,
  getJobById,
  deleteJob,
  hireWorker,
  postJobToAdmin,
  getRequestedJobs,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/job/:email", addJob);
router.get("/job", getAllJobs);
router.get("/job/requested", getRequestedJobs);
router.get("/job/:id", getJobById);
router.delete("/job/:id", deleteJob);
router.patch("/hire/:id", hireWorker);
router.post("/postAdmin", postJobToAdmin);

module.exports = router;
