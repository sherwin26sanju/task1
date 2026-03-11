const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

/**
 * GET /tasks
 */
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /tasks/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /tasks
 */
router.post("/", async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /tasks/:id
 */
router.put("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /tasks/:id
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
