"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      surname: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      middlename: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      login: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false,
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      isManager: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      manager_id: {
        type: Sequelize.TEXT,
        references: {
          model: "Users",
          key: "login",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
