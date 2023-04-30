module.exports = (app) => {
  const tutorial = require("../controllers/tutorial.controller");

  var router = require("express").Router();

  router.post("/add", tutorial.create);
  router.get("/getAll", tutorial.findAll);
  router.get("/findById/:tutorial", tutorial.findById);
  
  app.use("/api/tutorial", router);

};
