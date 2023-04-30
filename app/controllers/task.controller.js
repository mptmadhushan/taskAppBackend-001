const db = require("../models");
const tags = require("../controllers/tag.controller");

const Task = db.task;
const Tag = db.tag;
const User = db.user;

exports.create = (req,res) => {
  return Task.create({
    title:  req.body.title,
    description:  req.body.description,
    date:req.body.description,
    location:req.body.location,
    isRepeat:req.body.isRepeat,
    status:req.body.status,
  })
    .then((task) => {
      const tutorialId=task.id
      const tagId=req.body.userId
      if(req.body.userId){
        tags.addTaskUser(tagId,tutorialId)
      }
      res.send({ message: "Task Added registered successfully!" })
      return task;
    })
    .catch((err) => {
      console.log(">> Error while creating Task: ", err);
    });
};

exports.findAll = (req,res) => {
  return Task.findAll({
    include: [
      {
        model: User,
        as: "users",
        // attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(">> Error while retrieving Tasks: ", err);
    });
};

exports.findById = (id) => {
  return Task.findByPk(id, {
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        // through: {
        //   attributes: ["tag_id", "tutorial_id"],
        // },
      },
    ],
  })
    .then((task) => {
      return task;
    })
    .catch((err) => {
      console.log(">> Error while finding Task: ", err);
    });
};

exports.findTrending = (req, res) => {
  return Task.findAll({
    limit: 4,
    order: [["trend", "DESC"]],
  }).then((package) => {
    console.log("😀", package);
    res.send(package);
    // console.log(package);
    // return package;
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Task.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};