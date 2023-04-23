module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    phone:{
      type: Sequelize.STRING,
    },
    address:{
      type: Sequelize.STRING,
    },
    lat:{
      type: Sequelize.STRING,
    },
    lng:{
      type: Sequelize.STRING,
    }
  });

  return User;
};
