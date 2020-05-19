var express = require("express");
var router = express.Router();
const path = require("path");
module.exports = router;

router.get("/", function (req, res, next) {
  res.send("hola");
});
