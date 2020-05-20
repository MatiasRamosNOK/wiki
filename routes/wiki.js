const express = require("express");
const router = express.Router();
var models = require("../models");
var Page = models.Page;
var User = models.User;

router.get("/", function (req, res, next) {
  console.log(Page);
  console.log("Estoy en wiki.js");
  Page.findAll().then((info) => {
    res.json(info);
  });
});

router.post("/", function (req, res, next) {
  var infoPost = req.body;
  console.log(infoPost);
  //Si puede crear la pagina creo el usuario
  var crearPagina = Page.create({
    title: infoPost.title,
    content: infoPost.content,
    email: infoPost.email,
  }).then(() => {
    var crearUser = User.create({
      name: infoPost.name,
      email: infoPost.email,
    })
      .then(() => {
        var page = Page.findOne({
          where: {
            email: infoPost.email,
          },
        }).then((info) => {
          var url = info.dataValues.urlTitle;
          res.redirect(`/wiki/${url}`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/add", function (req, res, next) {
  res.render("addpage");
});

router.get("/:urlTitle", function (req, res, next) {
  var pagina = Page.findOne({
    where: {
      urlTitle: req.params.urlTitle,
    },
  }).then((info) => {
    var usuario = User.findOne({
      where: {
        email: info.dataValues.email,
      },
    })
      .then(function (user) {
        res.render("wikipage", { page: info, user: user });
      })
      .catch(next);
  });

  next();
});

router.get("/:urlTitle/:verbo", function (req, res, next) {
  var title = req.params.urlTitle;
  var verbo = req.params.verbo;
  if (verbo == "delete") {
    //Borrar la nota
    var page = Page.findOne({
      where: {
        urlTitle: title,
      },
    })
      .then((info) => {
        info.destroy();
      })
      .then(() => {
        res.send("La pagina se eliminó correctamente");
      });
  } else if (verbo == "edit") {
    //editar la nota
  }
});

module.exports = router;
