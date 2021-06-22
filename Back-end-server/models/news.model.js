module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("news", {
    newsId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    article: {
      type: Sequelize.STRING,
    },
    video: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,

    },
    views: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    city: {
      type: Sequelize.STRING,
    },
    locality: {
      type: Sequelize.STRING,
    },
    isApproved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    reporterId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "reporters",
        key: "reporterId",
      },
    },
  });
  return News;
};
