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
