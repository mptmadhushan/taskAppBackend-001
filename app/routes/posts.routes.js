module.exports = (app) => {
  const posts = require("../controllers/posts.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/add", posts.createPost);
  router.post("/add/comment", posts.createComment);

  // router.post("/subPackage", packages.createSubPackage);

  // // Retrieve all packages
  router.get("/getAll", posts.findAll);
  router.get("/findALatest", posts.findALatest);
  router.get("/findCategory", posts.findCategory);
  router.get("/findRandom", posts.findRandom);
  router.get("/findPostById/:postId", posts.findPostById);
  router.get("/getAll/:category", posts.findAllByCategory);
  router.get("/getAll/provider/:trend", posts.findAllByProvider);
  router.get("/findTrending", posts.findTrending);
  router.put("/updateTrend", posts.updateTrend);
  router.put("/updateParagraph", posts.updateParagraph);
  router.delete("/delete/:id", posts.delete);
  router.delete("/comment/delete/:id_p", posts.deleteComments);
  // router.get("/findAllPackageNames", packages.findAllPackageNames);

  // // router.get("/Category/getAll", packages.findAllCategory);

  // // Retrieve all published packages

  // // router.get("/getAll/:cat", packages.findAllByCategory);

  // // // Retrieve a single Tutorial with id
  // // router.get("/:id", packages.findOne);

  // // // Update a Tutorial with id
  // // router.put("/:id", packages.update);

  // // // Delete a Tutorial with id
  // router.delete("/:id", packages.delete);

  // // // Delete all packages
  // // router.delete("/", packages.deleteAll);

  app.use("/api/post", router);
};
