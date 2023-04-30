const db = require("../models");
const Tutorial = db.tutorial;
const Tag = db.tag;

exports.create = (req,res) => {
  return Tutorial.create({
    title:  req.body.title,
    description:  req.body.description,
    user_id:  1,
  })
    .then((tutorial) => {
      if(user_id)
      res.send({ message: "User was registered successfully!" })
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while creating Tutorial: ", err);
    });
};

exports.findAll = (req,res) => {
  return Tutorial.findAll({
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
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(">> Error while retrieving Tutorials: ", err);
    });
};

exports.findById = (id) => {
  return Tutorial.findByPk(id, {
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
    .then((tutorial) => {
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while finding Tutorial: ", err);
    });
};