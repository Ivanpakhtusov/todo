const router = require("express").Router();
const { Task, User } = require("../db/models");

router
  .get("/tasks", async (req, res) => {
    try {
      const tasks = await Task.findAll({ raw: true });
      res.json(tasks);
    } catch ({ message }) {
      res.json(message);
    }
  })
  .post("/tasks", async (req, res) => {
    try {
      const {
        title,
        description,
        priority,
        status,
        creator_id,
        responsible_id,
        finishedAt,
      } = req.body;
      const newTask = await Task.create({
        title,
        description,
        priority,
        status,
        creator_id,
        responsible_id,
        finishedAt,
      });
      res.json(newTask);
    } catch ({ message }) {
      res.json(message);
    }
  })
  .put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status, responsible_id, finishedAt } = req.body;
  
    try {
      const task = await Task.findByPk(id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.title = title || task.title;
      task.description = description || task.description;
      task.priority = priority || task.priority;
      task.status = status || task.status;
      task.responsible_id = responsible_id || task.responsible_id;
      task.finishedAt = finishedAt || task.finishedAt;
  
      await task.save();
  
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  })
  .delete("/tasks/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;
      const result = await Task.destroy({ where: { id: taskId } });
      console.log(result);
      if (result) {
        res.json(taskId);
      }
    } catch ({ message }) {
      res.json(message);
    }
  });

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ raw: true });
    res.json(users);
  } catch ({ message }) {
    res.json(message);
  }
});

module.exports = router;
