const express = require("express");
const dbData = require("../../databaseCredential");
const utils = require("./../../utils");
const crypto = require("crypto-js");
const db = require("../../models");
const secretKey = require("../../secretKey");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Reporters = db.Reporters;
const News = db.News;

const multer = require("multer");
const upload = multer({ dest: "images/" });
const fs = require("fs");

const router = express.Router();

router.post("/signup", (request, response) => {
  //  const {password}=request.body.password
  //  const encryptedPassword = crypto.SHA256(password)
  const reporters = {
    userName: request.body.userName || "default",
    password: crypto.SHA256(request.body.password).toString() || "default",
    email: request.body.email,
    phone: request.body.phone,
    isApproved: false, //Server is doing logic for this
    city: request.body.city,
  };
  console.log(reporters);
  // const encryptedPassword = crypto.SHA256(password)

  Reporters.create(reporters)
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "some error occured",
      });
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  result = {};
  const encryptedPassword = crypto.SHA256(password);
  const statement = `select reporterId, userName, phone, isApproved from reporters where email = '${email}' and password = '${encryptedPassword}'`;
  console.log(statement);
  dbData.query(statement, (err, data) => {
    if (err) {
      result["status"] = "error";
      result["error"] = err;
    } else {
      if (data.length == 0) {
        result["status"] = "error";
        result["error"] = "invalid crendential";
      } else {
        const reporters = data[0];
        if (reporters["isApproved"] == 0) {
          result["status"] = "error";
          result["error"] = "admin not activate ur account";
        } else if (reporters["isApproved"] == 1) {
          const token = jwt.sign(
            { id: reporters["reporterId"] },
            secretKey.secret
          );
          result["status"] = "success";
          result["data"] = {
            reporterId: reporters["reporterId"],
            userName: reporters["userName"],
            phone: reporters["phone"],
            token: token,
          };
        }
        // console.log(result);
      }
    }
    res.send(result);
  });
});

router.post("/addNews/:reporterId",upload.single('image'), (req, res) => {
  const { category, title, article, city, locality } = req.body;
  const reporterId = req.params.reporterId;
  const image = req.file.filename;

  const body = {
    category: category,
    title: title,
    article: article,
    city: city,
    locality: locality,
    reporterId: reporterId,
    image: image,
  };
   console.log(body);

  // const statement = `INSERT INTO news (category,title,article,city,locality,reporterId)
  //                     values ('${category}','${title}','${article}','${city}','${locality}',${reporterId})`;

  // dbData.query(statement, (err, data) => {
  //   res.send(utils.createResult(err, data));
  // });
  // console.log(body);

  News.create(body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the news.",
      });
    });
});

router.post(
  "/uploadImage/:newsId",
  upload.single("image"),
  (req, res, next) => {
    var fileName = req.file.filename;
    const newsId = req.params.newsId;
    const statement = `UPDATE news SET image ='${fileName}' where newsId=${newsId}`;

    dbData.query(statement, (err, data) => {
      res.send(utils.createResult(err, data));
    });
  }
);

module.exports = router;
