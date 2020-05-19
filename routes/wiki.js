const express = require("express");
const router = express.Router();
var models = require("../models");
var Page = models.Page;
var User = models.User;

router.get("/", function (req, res, next) {
  console.log(Page);

  Page.findAll().then((info) => {
    res.json(info);
  });
});

router.post("/", function (req, res, next) {
  var infoPost = req.body;
  Page.create({
    title: infoPost.title,
    content: infoPost.content,
  })
    .then((info) => res.send(res.json(info)))
    .catch((err) => {
      console.log(err);
    });
});

router.get("/add", function (req, res, next) {
  res.render("addpage");
});

router.get("/:urlTitle", function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle,
    },
  })
    .then(function (foundPage) {
      res.json(foundPage);
    })
    .catch(next);
});

module.exports = router;
