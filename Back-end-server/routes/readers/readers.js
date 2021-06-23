const express = require("express");
const dbData = require("../../databaseCredential");
const utils = require("./../../utils");
const db = require("../../models");
const News = db.News;
const fs = require("fs");

const router = express.Router();

const newsData = null;
//----------------------------------------------------------------------------------------------------//
//                                 Get All news
//----------------------------------------------------------------------------------------------------//

router.get("/news", (req, res) => {
  const statement = "SELECT * FROM news";

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});

//----------------------------------------------------------------------------------------------------//
//                                 Get Specific News...
//----------------------------------------------------------------------------------------------------//

router.get("/news/expandedNews/:newsId", (req, res) => {
  const newsid = req.params.newsId;
  const statement = `select * from news where newsId = ${newsid} ;`;

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});

//----------------------------------------------------------------------------------------------------//
//                                 Get Images of news
//----------------------------------------------------------------------------------------------------//
router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;

  const file = fs.readFileSync(__dirname + "/../../images/" +filename);
  res.send(file);
});

//----------------------------------------------------------------------------------------------------//
//                                 Update views count
//-----------------------------------------------------------------------------------------------------//

router.put("/views/:newsId", (req, res) => {
  const newsId = req.params.newsId;

  const statement = `UPDATE news SET views = views+1 where newsId=${newsId}`;

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});

//----------------------------------------------------------------------------------------------------//
//                                 Get Top 10 News a/c to views
//----------------------------------------------------------------------------------------------------//
router.get("/news/top10", (req, res) => {
  const statement = "SELECT * FROM news ORDER BY views desc limit 10";
  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});


router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  // const encryptedPassword = crypto.SHA256(password);
  const statement = `select readerId, userName, email from readers where email = '${email}' and password = '${password}'`;
  dbData.query(statement, (error, data) => {
      if (error) {
          res.send({ status: "error", error: error });
      } else {
          if (data.length == 0) {
              res.send({ status: "error", error: "Reader does not exist" });
          } else {
              //   const admin = data[0];
              //   const token = jwt.sign({ id: admin["adminId"] }, secretKey.secret);

              res.send(
                  utils.createResult(error, data)
              );
          }
      }
  });
});




module.exports = router;
