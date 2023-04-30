module.exports = (app) => {
  const tags = require("../controllers/tag.controller");

  var router = require("express").Router();

  router.post("/add", tags.create);
  router.get("/getAll", tags.findAll);
  router.post("/addTaskUser", tags.addTutorial);

  app.use("/api/tag", router);
};
