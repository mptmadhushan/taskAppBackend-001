const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Task = db.task;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.send({ message: "User was registered successfully!" });
      // if (req.body.roles) {
      //   Role.findAll({
      //     where: {
      //       name: {
      //         [Op.or]: req.body.roles,
      //       },
      //     },
      //   }).then((roles) => {
      //     user.setRoles(roles).then(() => {
      //       res.send({ message: "User was registered successfully!" });
      //     });
      //   });
      // } else {
      // user role = 1
      // user.setRoles([1]).then(() => {
      //   res.send({ message: "User was registered successfully!" });
      // });
      // }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        accessToken: token,
      });
      // user.getRoles().then((roles) => {
      //   for (let i = 0; i < roles.length; i++) {
      //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
      //   }
      //   res.status(200).send({
      //     id: user.id,
      //     username: user.username,
      //     email: user.email,
      //     phone: user.phone,
      //     address: user.address,
      //     lat: user.lat,
      //     lng: user.lng,
      //     roles: authorities,
      //     accessToken: token,
      //   });
      // });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  return User.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(">> Error while retrieving Tasks: ", err);
    });
};

exports.addTaskUser = (req, res) => {
  const { userId, taskId } = req.body;
  return User.findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(400).send({
          message: "User can not be empty!",
        });
        return;
      }
      console.log("User : ", user);
      return Task.findByPk(taskId).then((task) => {
        if (!task) {
          res.status(400).send({
            message: "Task can not be empty!",
          });
          return;
        }

        user.addTask(task);
        console.log(`>> added task id=${task.id} to Tag id=${user.id}`);
        res.send(user);
      });
    })
    .catch((err) => {
      console.log(">> Error while adding task to user: ", err);
    });
};

exports.update = (req, res) => {
  const { id } = req.body;
  User.update(
    { username:req.body.username},
    { where: { id: id } },
  )
    .then(result =>
      res.send(result)
      // handleResult(result)
    )
    .catch(err => {
      console.log("🚀 ~ file: auth.controller.js:155 ~ err:", err)
      return // handleError(err)
    })
};
