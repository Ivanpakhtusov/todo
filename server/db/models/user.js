"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Task, User }) {
      this.hasMany(Task, { foreignKey: "creator_id" });
      this.hasMany(Task, { foreignKey: "responsible_id" });
      this.hasMany(User, { foreignKey: "manager_id" });
      this.belongsTo(User, { foreignKey: "manager_id" });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      surname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      middlename: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      login: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      isManager: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      manager_id: {
        type: DataTypes.TEXT,
        references: {
          model: "User",
          key: "login",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
