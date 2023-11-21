const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/databaseConn");
const port = process.env.PORT || 4000;
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(
  cors({ origin: "*", methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] }) // for handling CORS policy error
);

// HOME ROUTE
app.get("/", (req, res) => {
  res.status(200).send("Srom Service-Buy Sell Platform Server is running...");
});

// IMPORT ROUTES
const userRoute = require("./routes/userRoute");
const serviceRoute = require("./routes/serviceRoute");
const jobRoute = require("./routes/jobRoute");
const messageRoute = require("./routes/messageRoute");

// ROUTES HERE
app.use("/api/v1", userRoute);
app.use("/api/v1", serviceRoute);
app.use("/api/v1", jobRoute);
app.use("/api/v1", messageRoute);

// LISTENING SERVER
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

// IF ROUTE NOT FOUND
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// IF SERVER ERROR
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something broke",
  });
});
