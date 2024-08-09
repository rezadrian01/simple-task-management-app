const Task = require("../models/Task");
const User = require("../models/User");

exports.createTask = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      const err = new Error("User not authenticated");
      err.statusCode = 401;
      throw err;
    }
    const title = req.body.title;
    const deadline = req.body.deadline;
    const description = req.body.description;
    const task = new Task({
      title,
      deadline,
      description,
      userId: req.userId,
      isCompleted: false,
    });
    await task.save();
    res.status(201).json({ message: "Success create task", success: true });
  } catch {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      const err = new Error("User not authenticated");
      err.statusCode = 401;
      throw err;
    }
    const tasks = await Task.find({ userId: req.userId });
    const totalTasks = await Task.find({ userId: req.userId }).countDocuments();
    setTimeout(() => {
      res.status(200).json({
        message: "Success get tasks",
        success: true,
        tasks,
        totalTasks,
      });
    }, 2000);
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      const err = new Error("User not authenticated");
      err.statusCode = 401;
      throw err;
    }
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const err = new Error("Task not found");
      err.statusCode = 404;
      throw err;
    }
    res
      .status(200)
      .json({ message: "Success get a task", success: true, task });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      const err = new Error("User not authenticated");
      err.statusCode = 401;
      throw err;
    }
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const err = new Error("Task not found");
      err.statusCode = 404;
      throw err;
    }
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.deadline = req.body.deadline || task.deadline;
    task.isCompleted = req.body.isCompleted || task.isCompleted;
    await task.save();
    res.status(200).json({ message: "Success update task", success: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      const err = new Error("User not authenticated");
      err.statusCode = 401;
      throw err;
    }
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    const user = await User.findById(req.userId);
    if (!task || !user) {
      const err = new Error("Not found");
      err.statusCode = 404;
      throw err;
    }
    const deleteTaskResult = await Task.findByIdAndDelete(taskId);
    user.tasks.pull(taskId);
    await user.save();
    res.status(200).json({ message: "Success deleting task", success: true });
  } catch (err) {
    next(err);
  }
};
