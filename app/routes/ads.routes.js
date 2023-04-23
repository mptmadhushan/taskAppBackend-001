module.exports = (app) => {
  const ads = require("../controllers/Ads.controller");

  var router = require("express").Router();

  router.post("/add", ads.createAdd);
  router.get("/getAll", ads.findAll);
  router.get("/findAddById/:postId", ads.findPostById);
  router.delete("/delete/:id", ads.delete);

  app.use("/api/ads", router);
};
