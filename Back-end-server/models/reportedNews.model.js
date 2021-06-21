module.exports = (sequelize, Sequelize) => {
  const ReportedNews = sequelize.define("reportedNews", {
    reportedNewsId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    readerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "readers",
        key: "readerId",
      },
    },
    newsId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "news",
        key: "newsId",
      },
    },
    category: {
      type: Sequelize.STRING,
    },
  });
  return ReportedNews;
};
