const db = require("../models");
const Tutorial = db.tutorial;
const Tag = db.tag;

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
//🤬 
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
    return Tag.findByPk(req.body.tagId)
      .then((tag) => {
        if (!tag) {
          console.log("Tag not found!");
          return null;
        }
        return Tutorial.findByPk(req.body.tutorialId).then((tutorial) => {
          if (!tutorial) {
            res.send({ message: "Tutorial not found!" });
            return null;
          }
  
          tag.addTutorial(tutorial);
          res.send({ message:`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}` });
          console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
          return tag;
        });
      })
      .catch((err) => {
        res.send({ message:`>> Error while adding Tutorial to Tag:, ${err}`});
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };