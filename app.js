const express = require("express");
const bodyParser = require("body-parser");
const nunJucks = require("nunjucks");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true })); // para HTML form submits
app.use(bodyParser.json()); // seria para AJAX requests

app.use("/", routes);

app.listen(3000, function () {
  console.log("listening on port 3000");
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.static(path.join(__dirname, "/public")));
