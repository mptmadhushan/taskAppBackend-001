module.exports = (app) => {
  const tasks = require("../controllers/tasks.controller");

  var router = require("express").Router();

  router.task("/add", tasks.createTask);
  router.task("/add/teamMember", tasks.addTaskManager);
  router.get("/getAll", tasks.findAll);
  router.get("/findTaskById/:taskId", tasks.findTaskById);
  router.get("/getAll/:team", tasks.findAllByCategory);
  router.get("/getAll/provider/:trend", tasks.findAllByProvider);
  router.get("/findTrending", tasks.findTrending);
  router.put("/updateTrend", tasks.updateTrend);
  router.delete("/delete/:id", tasks.delete);
  router.delete("/comment/delete/:id_p", tasks.deleteComments);
  app.use("/api/task", router);
};
