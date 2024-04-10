"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataUsers = [
      {
        name: "Иван",
        surname: "Иванов",
        middlename: "Иванович",
        login: "ivanivanov@gmail.com",
        password: "000000",
        manager_id: "manager@manager.com",
      },
      {
        name: "Дмитрий",
        surname: "Иванов",
        middlename: "Дмитриевич",
        login: "dmitriyivanov@gmail.com",
        password: "654321",
        manager_id: "manager@manager.com",
      },
      {
        name: "Олег",
        surname: "Иванов",
        middlename: "Олегович",
        login: "olegivanov@gmail.com",
        password: "123456",
        manager_id: "manager@manager.com",
      },
      {
        name: "Иван",
        surname: "Пахтусов",
        middlename: "Дмитриевич",
        login: "manager@manager.com",
        password: "2qwewasdszxc",
        isManager: true,
      },
    ];

    const hashedPasswords = await Promise.all(
      dataUsers.map((user) => bcrypt.hash(user.password, 10))
    );

    const users = dataUsers.map((user,index) => ({
      isManager: user.isManager || false,
      ...user,
      password: hashedPasswords[index],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users");
  },
};
