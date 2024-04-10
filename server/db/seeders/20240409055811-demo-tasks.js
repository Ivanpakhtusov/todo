"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataTasks = [
      {
        title: "Task1",
        description: "Сделай задачу №1",
        priority: "low",
        status: "toDo",
        creator_id: "manager@manager.com",
        responsible_id: 1,
      },
      {
        title: "Task2",
        description: "Сделай задачу №2",
        priority: "high",
        status: "inProgress",
        creator_id: "manager@manager.com",
        responsible_id: 1,
      },
      {
        title: "Task3",
        description: "Сделай задачу №3",
        priority: "medium",
        status: "toDo",
        creator_id: "manager@manager.com",
        responsible_id: 3,
      },
      {
        title: "Task3",
        description: "Сделай задачу №3",
        priority: "high",
        status: "inProgress",
        creator_id: "manager@manager.com",
        responsible_id: 2,
      },
    ];
    const tasks = dataTasks.map((task) => ({
      ...task,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert("Tasks", tasks);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks");
  },
};
