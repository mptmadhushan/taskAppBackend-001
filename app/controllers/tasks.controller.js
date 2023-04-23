const db = require("../models");
const Tasks = db.tasks;
const Members = db.members;
const upload = require("../middleware/uploadArray");

exports.createTask = async (req, res) => {
  console.log(
    "🚀 ~ fil: tasks.controller.js ~ line 7 ~ exports.createTask= ~ req",
    req.files
  );
  await upload(req, res);

  if (req.files == undefined) {
    return res.status(400).send({ message: "Please upload a file!" });
  }
  const photo = {
    isBlur:req.body.isBlur,
    image1: req.files.image1[0].filename,
    image2: req.files.image2[0].filename,
    advertisement: req.files.advertisement[0].filename,
    caption: req.body.caption,
    short_para: req.body.short_para,
    para1: req.body.para1,
    para2: req.body.para2,
    para3: req.body.para3,
    title: req.body.title,
    lng: req.body.lng,
    lat: req.body.lat,
    phone: req.body.phone,
    address: req.body.address,
    isBlur: req.body.isBlur,
    email: req.body.email,
    price: req.body.price,
    trend: req.body.trend,
    task: req.body.task,
  };

  // Save Task in the database
  Tasks.create(photo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task.",
      });
    });
};
exports.addTaskManager = (req, res) => {
  Members.create({
    name: req.body.name,
    comment: req.body.comment,
    TaskId: req.body.taskId,
    email: req.body.email,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task.",
      });
    });
};
exports.findTaskById = (req, res) => {
  const taskId = req.params.taskId;

  return Tasks.findByPk(taskId, { include: ["members"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task.",
      });
    });
};

exports.findAll = (req, res) => {
  return Tasks.findAll({
    // attributes: [
    //   "*",
    //   [db.Sequelize.fn('date_format', db.Sequelize.col('task.createdAt'), '%d %b %y'), 'col_name']

    // ],
    include: ["members"],
  }).then((package) => {
    console.log(">> All tasks", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findALatest = (req, res) => {
  return Tasks.findAll({
    limit: 4,
    order: [["createdAt", "DESC"]],
    include: ["members"],
  }).then((package) => {
    console.log("😀", package);
    console.log(">> All tasks", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findTrending = (req, res) => {
  return Tasks.findAll({
    limit: 4,
    order: [["trend", "DESC"]],

    include: ["members"],
  }).then((package) => {
    console.log("😀", package);
    console.log(">> All tasks", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findRandom = (req, res) => {
  const Sequelize = require("sequelize");
  return Tasks.findAll({
    order: Sequelize.literal("rand()"),
    limit: 6,
    include: ["members"],
  }).then((package) => {
    console.log("😀", package);
    console.log(">> All tasks", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findTask = (req, res) => {
  const Sequelize = require("sequelize");
  return Tasks.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("task")), "task"],
    ],
  }).then((package) => {
    console.log("😀", package);
    console.log(">> All tasks", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findAllByTask = (req, res) => {
  const task = req.params.task;

  return Tasks.findAll({
    where: { task: task },
    include: ["members"],
  }).then((package) => {
    console.log(">> All tasks", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};exports.findAllByProvider = (req, res) => {
  const trend = req.params.trend;

  return Tasks.findAll({
    where: { trend: trend },
    include: ["members"],
  }).then((package) => {
    console.log(">> All tasks", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findAllByTask = (req, res) => {
  const task = req.params.task;

  return Tasks.findAll({
    where: { task: task },
    include: ["members"],
  }).then((package) => {
    console.log(">> All tasks", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findAllPackageNames = (req, res) => {
  return Tasks.findAll({
    attributes: ["title"],
  }).then((package) => {
    console.log(">> All tasks", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findTaskById = (req) => {
  return Tasks.findByPk((packageId = req.body.packageId), {
    include: ["sub_packages"],
  })
    .then((tasks) => {
      return tasks;
    })
    .catch((err) => {
      console.log(">> Error while finding tasks: ", err);
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Tasks.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};
exports.deleteComments = (req, res) => {
  const id_p = req.params.id_p;
  Members.destroy({
    where: { id_p: id_p },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id_p}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + err,
      });
    });
};
exports.updateTrend = (req, res) => {
  const id = req.body.id;

  Tasks.update(
    { isBlur: false},
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};
exports.updateParagraph = (req, res) => {
  const id = req.body.id;

  Tasks.update(
    {
      para1: req.body.para1,
      para2: req.body.para2,
      para3: req.body.para3,
    },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};
