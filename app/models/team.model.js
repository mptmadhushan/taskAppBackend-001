module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define("team", {
    name: {
      type: DataTypes.STRING,
    },
    id_p: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  });

  return Teams;
};
