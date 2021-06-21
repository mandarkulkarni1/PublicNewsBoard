module.exports = (sequelize, Sequelize) => {
  const Reporters = sequelize.define("reporters", {
    reporterId: {
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
    },
    phone: {
      type: Sequelize.STRING,
    },
    isApproved: {
      type: Sequelize.BOOLEAN,
      ddefaultValue: false,
    },
    city: {
      type: Sequelize.STRING,
    },
  });
  return Reporters;
};
