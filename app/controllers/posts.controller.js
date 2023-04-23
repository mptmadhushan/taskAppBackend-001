const db = require("../models");
const Posts = db.posts;
const Comments = db.comments;
const upload = require("../middleware/uploadArray");

exports.createPost = async (req, res) => {
  console.log(
    "🚀 ~ fil: posts.controller.js ~ line 7 ~ exports.createPost= ~ req",
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
    category: req.body.category,
  };

  // Save Tutorial in the database
  Posts.create(photo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
exports.createComment = (req, res) => {
  Comments.create({
    name: req.body.name,
    comment: req.body.comment,
    PostId: req.body.postId,
    email: req.body.email,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
exports.findPostById = (req, res) => {
  const postId = req.params.postId;

  return Posts.findByPk(postId, { include: ["comments"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.findAll = (req, res) => {
  return Posts.findAll({
    // attributes: [
    //   "*",
    //   [db.Sequelize.fn('date_format', db.Sequelize.col('post.createdAt'), '%d %b %y'), 'col_name']

    // ],
    include: ["comments"],
  }).then((package) => {
    console.log(">> All tutorials", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findALatest = (req, res) => {
  return Posts.findAll({
    limit: 4,
    order: [["createdAt", "DESC"]],
    include: ["comments"],
  }).then((package) => {
    console.log("😀", package);
    console.log(">> All tutorials", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findTrending = (req, res) => {
  return Posts.findAll({
    limit: 4,
    order: [["trend", "DESC"]],

    include: ["comments"],
  }).then((package) => {
    console.log("😀", package);
    console.log(">> All tutorials", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findRandom = (req, res) => {
  const Sequelize = require("sequelize");
  return Posts.findAll({
    order: Sequelize.literal("rand()"),
    limit: 6,
    include: ["comments"],
  }).then((package) => {
    console.log("😀", package);
    console.log(">> All tutorials", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findCategory = (req, res) => {
  const Sequelize = require("sequelize");
  return Posts.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("category")), "category"],
    ],
  }).then((package) => {
    console.log("😀", package);
    console.log(">> All tutorials", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findAllByCategory = (req, res) => {
  const category = req.params.category;

  return Posts.findAll({
    where: { category: category },
    include: ["comments"],
  }).then((package) => {
    console.log(">> All tutorials", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};exports.findAllByProvider = (req, res) => {
  const trend = req.params.trend;

  return Posts.findAll({
    where: { trend: trend },
    include: ["comments"],
  }).then((package) => {
    console.log(">> All tutorials", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findAllByCategory = (req, res) => {
  const category = req.params.category;

  return Posts.findAll({
    where: { category: category },
    include: ["comments"],
  }).then((package) => {
    console.log(">> All tutorials", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findAllPackageNames = (req, res) => {
  return Posts.findAll({
    attributes: ["title"],
  }).then((package) => {
    console.log(">> All tutorials", JSON.stringify(package, null, 2));
    res.send(package);
    // console.log(package);
    // return package;
  });
};
exports.findTutorialById = (req) => {
  return Posts.findByPk((packageId = req.body.packageId), {
    include: ["sub_packages"],
  })
    .then((tutorial) => {
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Posts.destroy({
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
exports.deleteComments = (req, res) => {
  const id_p = req.params.id_p;
  Comments.destroy({
    where: { id_p: id_p },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id_p}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + err,
      });
    });
};
exports.updateTrend = (req, res) => {
  const id = req.body.id;

  Posts.update(
    { isBlur: false},
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};
exports.updateParagraph = (req, res) => {
  const id = req.body.id;

  Posts.update(
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
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};
