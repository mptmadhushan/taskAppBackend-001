const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.task = require("./task.model")(sequelize, Sequelize);
db.tag = require("./tag.model")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});


// db.user.belongsToMany(db.task, {
//   through: "task_user",
//   as: "tasks",
//   foreignKey: "tag_id",
// });

// db.task.belongsToMany(db.user, {
//   through: "task_user",
//   as: "users",
//   foreignKey: "tutorial_id",
// });
db.user.belongsToMany(db.task, {
  through: "user_task",
  foreignKey: 'userId',
  as: 'tasks'
});
db.task.belongsToMany(db.user, {
  through: "user_task",
  foreignKey: 'recipeId',
  as: 'users'
});
// db.user.belongsToMany(db.task, { through: 'task_user' });
// db.task.belongsToMany(db.user, { through: 'task_user' });

db.ROLES = ["user", "admin", "provider"];

module.exports = db;
