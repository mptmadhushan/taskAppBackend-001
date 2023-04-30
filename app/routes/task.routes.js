module.exports = (app) => {
  const task = require("../controllers/task.controller");

  var router = require("express").Router();

  router.post("/add", task.create);
  router.get("/getAll", task.findAll);
  router.get("/findById/:task", task.findById);
  
  app.use("/api/task", router);

};
