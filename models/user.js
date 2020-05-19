var Sequelize = require("sequelize");
var db = require("../db");
//-- User Model
class User extends Sequelize.Model {}
User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  { sequelize: db, modelName: "users" }
);

module.exports = User;
