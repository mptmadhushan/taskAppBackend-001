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

  exports.addTaskUser=(tagId,tutorialId)=> {
  return User.findByPk(1)
      .then((user) => {
        if (!user) {
          console.log('Recipe Not Found')
          return res.status(400).json({ message: 'Recipe Not Found' });
        }
  
        user.addIngredient(2
        )
          .then((response) => {
            console.log("🚀 ~ file: tag.controller.js:81 ~ .then ~ response:", response)
            return res.status(200).json(response)
          })
          .catch((error) => {
            console.log("🚀 ~ file: tag.controller.js:84 ~ .then ~ error:", error)
            return res.status(400).json(error)
          });
      })
      .catch((error) => {
        console.log("🚀 ~ file: tag.controller.js:88 ~ error:", error)
        return res.status(400).json(error)
      });
  }

  // exports.addTaskUser=(req, res)=> {
  //   Recipe.findById(req.params.recipeId)
  //     .then((recipe) => {
  //       if (!recipe) {
  //         return res.status(400).json({ message: 'Recipe Not Found' });
  //       }
  
  //       recipe.addIngredient(req.params.ingredientId, {
  //         through: {
  //           meassurementAmount: req.body.meassurementAmount,
  //           meassurementType: req.body.meassurementType
  //         }
  //       })
  //         .then((response) => {
  //           return res.status(200).json(response)
  //         })
  //         .catch((error) => {
  //           return res.status(400).json(error)
  //         });
  //     })
  //     .catch((error) => {
  //       return res.status(400).json(error)
  //     });
  // }
  
  // exports.addTaskUser = (tagId, tutorialId) => {
  //   return Tutorial.findByPk(tutorialId)
  //     .then((tag) => {
  //       console.log("🚀 ~ file: tag.controller.js:73 ~ .then ~ tag:", tag)
  //       if (!tag) {
  //         console.log("Tag not found!");
  //         return null;
  //       }
  //       return User.findByPk(tagId).then((user) => {
  //         if (!user) {
  //           console.log("Tutorial not found!");
  //           return null;
  //         }
  
  //         tag.addTaskUser(user);
  //         console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
  //         return tag;
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(">> Error while adding Tutorial to Tag: ", err);
  //     });
  // };