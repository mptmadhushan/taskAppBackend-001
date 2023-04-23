module.exports = (app) => {
  const mail = require("../controllers/contact.email");
  var router = require("express").Router();

  router.post("/", mail.mail);

  app.use("/api/contact/cpg", router);
};
