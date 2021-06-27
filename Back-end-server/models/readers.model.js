module.exports = (sequelize, Sequelize) => {
  const Readers = sequelize.define("readers", {
    readerId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
  });
  return Readers;
};
