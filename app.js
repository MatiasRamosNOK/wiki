const express = require("express");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();
const path = require("path");
const db = require("./db");

app.use(bodyParser.urlencoded({ extended: true })); // para HTML form submits
app.use(bodyParser.json()); // seria para AJAX requests

app.use("/", routes);

// Donde tu servidor y la app de express están siendo definidas
var models = require("./models");
// ... otras cosas
// Asegurate de estar exportando tu db del archivo de tus modelos
db.sync({ force: true })
  .then(function () {
    // asegurate de reemplazar el nombre de abajo con tu app de express
    app.listen(3000, function () {
      console.log("Server is listening on port 3000!");
    });
  })
  .catch(console.error);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.static(path.join(__dirname, "/public"))); // carpeta virtual de archivos "fisicos"

nunjucks.configure("views", { noCache: true });
app.set("view engine", "html");
app.engine("html", nunjucks.render);
