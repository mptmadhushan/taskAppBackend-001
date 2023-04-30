const db = require("../models");
const Tutorial = db.task;
const Tag = db.tag;
const User = db.user;

exports.create = (req,res) => {
    return Tag.create({
      name: req.body.name,
    })
      .then((tag) => {
        console.log(">> Created Tag: " + JSON.stringify(tag, null, 2));
         res.send(tag);
      })
      .catch((err) => {
        console.log(">> Error while creating Tag: ", err);
      });
  };
//:
  exports.findAll = (req,res) => {
    return Tag.findAll({
      include: [
        {
          model: Tutorial,
          as: "tutorials",
          attributes: ["id", "title", "description"],
          through: {
            attributes: [],
          }
        },
      ],
    })
      .then((data) => {
         res.send(data);
      })
      .catch((err) => {
        console.log(">> Error while retrieving Tags: ", err);
      });
  };

  exports.addTutorial = (req, res) => {
    console.log("🚀 ~ file: tag.controller.js:40 ~ req:", req)
    return User.findByPk(req.user_id)
    
      .then((task) => {
        console.log("🚀  ~ tag:", task)
        if (!task) {
          console.log("Tag not found!");
          return null;
        }
        return Tutorial.findByPk(req.task_id).then((task) => {
          if (!tutorial) {
          console.log(`>> added Tutorial id=${task.id} to Tag id=${task.id}`);

            // res.send({ message: "Tutorial not found!" });
            return null;
          }
  
          task.addTutorial(tutorial);
        //   res.send({ message:`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}` });
          console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${task.id}`);
          return task;
        });
      })
      .catch((err) => {
        // res.send({ message:`>> Error while adding Tutorial to Tag:, ${err}`});
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };

  exports.addTaskUser = (tagId, tutorialId) => {
    return User.findByPk(tagId)
      .then((tag) => {
        console.log("🚀 ~ file: tag.controller.js:73 ~ .then ~ tag:", tag)
        if (!tag) {
          console.log("Tag not found!");
          return null;
        }
        return Tutorial.findByPk(tutorialId).then((tutorial) => {
          if (!tutorial) {
            console.log("Tutorial not found!");
            return null;
          }
  
          tag.addTaskUser(tutorial);
          console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
          return tag;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };