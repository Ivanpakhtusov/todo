"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "creator_id" });
      this.belongsTo(User, { foreignKey: "responsible_id" });
    }
  }
  Task.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      priority: {
        type: DataTypes.ENUM("high", "medium", "low"),
      },
      status: {
        type: DataTypes.ENUM("toDo", "inProgress", "done", "cancelled"),
      },
      creator_id: {
        allowNull: false,
        type: DataTypes.TEXT,
        references: {
          model: "User",
          key: "login",
        },
      },
      responsible_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      finishedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
