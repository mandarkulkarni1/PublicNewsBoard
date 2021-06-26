/*
  Define the sql and database name
*/
module.exports = {

    HOST: "localhost",
    USER: "root",
    PASSWORD: "admin123",
    DB: "public_news_board",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  
  };
  