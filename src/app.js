const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middleware/error.middleware");
const logger = require("./utils/logger");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(logger);

app.use("/tasks", taskRoutes);
app.use(errorHandler);

module.exports = app;
