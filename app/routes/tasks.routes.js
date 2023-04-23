module.exports = (app) => {
  const tasks = require("../controllers/tasks.controller");

  var router = require("express").Router();

  router.task("/add", tasks.createPost);
  router.task("/add/teamMember", tasks.addTaskManager);
  router.get("/getAll", tasks.findAll);
  router.get("/findTaskById/:taskId", tasks.findPostById);
  router.get("/getAll/:team", tasks.findAllByCategory);
  router.get("/getAll/provider/:trend", tasks.findAllByProvider);
  router.get("/findTrending", tasks.findTrending);
  router.put("/updateTrend", tasks.updateTrend);
  router.put("/updateParagraph", tasks.updateParagraph);
  router.delete("/delete/:id", tasks.delete);
  router.delete("/comment/delete/:id_p", tasks.deleteComments);
  app.use("/api/task", router);
};
