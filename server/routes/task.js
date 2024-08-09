const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/Task");

router.get("/tasks", taskControllers.getTasks);
router.get("/task", taskControllers.getTask);
router.post("/task", taskControllers.createTask);
router.put("/task/:taskId", taskControllers.updateTask);
router.delete("/task/:taskId", taskControllers.deleteTask);

module.exports = router;
