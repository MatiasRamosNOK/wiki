var Sequelize = require('sequelize');
// const S = require('sequelize')
var db = require('../db')

class Page extends Sequelize.Model {}
Page.init({
  title: {
    type: Sequelize.STRING
  },
  urlTitle: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
}, { sequelize:db, modelName: 'page' });
//-- User Model
class User extends Sequelize.Model {}
User.init({
  name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
}, { sequelize:db, modelName: 'users' });
//--
module.exports = {
  Page: Page,
  User: User
};

/* 
 */