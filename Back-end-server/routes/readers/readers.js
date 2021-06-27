const express = require("express");
const dbData = require("../../databaseCredential");
const utils = require("./../../utils");
const db = require("../../models");
const Readers = db.Readers;
const fs = require("fs");
const ReportedNews = db.ReportedNews;
const router = express.Router();

const newsData = null;


//----------------------------------------------------------------------------------------------------//
//                                 Get All news

//                                 Get Images of news
//----------------------------------------------------------------------------------------------------//
router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;

  const file = fs.readFileSync(__dirname + "/../../images/" + filename);
  res.send(file);
});

//----------------------------------------------------------------------------------------------------//
//                                 Get Specific News...
//----------------------------------------------------------------------------------------------------//


//----------------------------------------------------------------------------------------------------//
//                                 Get Top 10 News a/c to views
//----------------------------------------------------------------------------------------------------//
router.get("/news/top10", (req, res) => {
  const statement = "SELECT * FROM news ORDER BY views desc limit 10";
  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});





//Get All news mandar
router.get("/news", (req, res) => {
  const statement = "SELECT * FROM news";

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});

//Get Specific News... Mandar
router.get("/news/expandedNews/:newsId", (req, res) => {
  const newsid = req.params.newsId;
  const statement = `select * from news where newsId = ${newsid}`;

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});


// Sign in Reader Mandar
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  // const encryptedPassword = crypto.SHA256(password);
  const statement = `select readerId, userName, email from readers where email = '${email}' and password = '${password}'`;
  dbData.query(statement, (error, data) => {
    if (error) {
      res.send({ status: "error", error: error });
    } else {
      if (data.length === 0) {
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

//Update views count mandar
router.post("/views", (req, res) => {
  const { newsId } = req.body;
  const statement = `UPDATE news SET views = views+1 where newsId=${newsId}`;

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});


router.post("/signup", (request, response) => {

  const readers = {
    userName: request.body.userName || "default",
    password: request.body.password || "default",
    email: request.body.email
  };
  console.log(readers);
  // const encryptedPassword = crypto.SHA256(password)

  Readers.create(readers)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "some error occured",
      });
    });
});

router.get("/search/:searchValue", (req, res) => {
  let searchValue = req.params.searchValue;
  searchValue = searchValue.replace(/\+/g, " ")
  const statement = `select * from news where city = '${searchValue}' OR locality = '${searchValue}' OR title like '%${searchValue}%'`;

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});

//Mandar function for reporting  news
router.post("/reportnews", (req, res) => {
  const { category, newsId, readerId } = req.body;
  const body = {
    category: category,
    newsId: newsId,
    readerId: readerId
  }
  ReportedNews.create(body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while asd the news.",
      });
    });
});

router.get('/videos/:filename', (request, response) => {
  const { filename } = request.params

  const path = __dirname + '/../../videos/' + filename
  const data = fs.readFileSync(path)
  response.send(data)
})

router.get('/videos', (request, response) => {
  const statement = `SELECT * FROM videos`;

  dbData.query(statement, (err, data) => {
    response.send(utils.createResult(err, data));
  });
})




module.exports = router;
