var Sequelize = require("sequelize");
var db = require("../db");
class Page extends Sequelize.Model {}
Page.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    urlTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("open", "closed"),
    },
    urlPagina: {
      type: Sequelize.VIRTUAL,
      get() {
        return `${this.urlTitle}`;
      },
    },
  },
  { sequelize: db, modelName: "pages" }
);

Page.addHook("beforeValidate", (page) => {
  function generateUrlTitle(title) {
    if (title) {
      // Remueve todos los caracteres no-alfanuméricos
      // y hace a los espacios guiones bajos.
      return title.replace(/\s+/g, "_").replace(/\W/g, "");
    } else {
      // Generá de forma aleatoria un string de 5 caracteres
      return Math.random().toString(36).substring(2, 7);
    }
  }
  page.urlTitle = generateUrlTitle(page.title);
});

module.exports = Page;
