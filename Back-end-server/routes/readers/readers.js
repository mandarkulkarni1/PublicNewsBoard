const express = require("express");
const dbData = require("../../databaseCredential");
const utils = require("./../../utils");
const db = require("../../models");
const News = db.News;

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




// router.get("/news", (req, res) => {
//   News.findAll()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving news.",
//       });
//     });
// });

//----------------------------------------------------------------------------------------------------//
//                                 Update views count
//--------------- -------------------------------------------------------------------------------------//

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
//----------------------------------------------------------------------------------------------------//
//                                 Get News Categorywise
//----------------------------------------------------------------------------------------------------//
router.get("/news/:category", (req, res) => {
  const category = req.params.category;

  const statement = `SELECT * FROM news where category=${category}`;
  
  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });

});

module.exports = router;
