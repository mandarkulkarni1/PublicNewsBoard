const dbConfig = require("../db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
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

db.Reporters = require("./reporter.model.js")(sequelize, Sequelize);
db.Admin = require("./admin.model")(sequelize, Sequelize);
db.News = require("./news.model")(sequelize, Sequelize);
db.Readers = require("./readers.model")(sequelize, Sequelize);
db.ReportedNews = require("./reportedNews.model")(sequelize, Sequelize);
module.exports = db;
