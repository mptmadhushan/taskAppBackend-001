const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
path = require("path");

const app = express();
global.__basedir = __dirname;

const db = require("./app/models");
const Role = db.role;
app.use(express.static(path.join(__dirname, "/uploads")));
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
  // initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "provider",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
var corsOptions = {
  // origin: "https://photography-portfolio-front.herokuapp.com",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to helpOut application." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/posts.routes")(app);
require("./app/routes/ads.routes")(app);
require("./app/routes/contact.cpg.mail.routes")(app);

// set port, listen for requests
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
