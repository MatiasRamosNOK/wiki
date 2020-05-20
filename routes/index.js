var express = require("express");
const sequelize = require("sequelize");
const models = require("../models/");
const user = require("../models/user");
var router = express.Router();
const path = require("path");
const wikiRouter = require("./wiki");
const userRouter = require("./user");
const { Page } = require("../models");
const { User } = require("../models");
module.exports = router;

router.use("/wiki", wikiRouter);
router.use("/users", function (req, res, next) {});
router.get("/", function (req, res, next) {
  var user = Page.findAll().then((info) => {
    res.render("index", { pages: info });
  });
});

router.get("/wiki/:url", function (req, res, next) {
  var url = req.params.url;
  Page.findAll({
    where: {
      urlTitle: url,
    },
  })
    .then((data) => {
      res.render(data);
    })
    .catch((err) => {
      console.log(err);
      res.render(err);
    });
});
