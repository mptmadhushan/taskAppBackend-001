module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("task", {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      date:{
        type:DataTypes.STRING,
      },
      location:{
        type:DataTypes.STRING
      }
    });
  
    return Task;
  };