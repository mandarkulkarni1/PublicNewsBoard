const express = require("express");

const dbData = require("../../databaseCredential");
const utils = require("./../../utils");
const crypto = require("crypto-js");
const db = require("../../models");
const secretKey = require("../../secretKey");
const jwt = require("jsonwebtoken");
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
        console.log(result);
      }
    }
    res.send(result);
  });
});

router.post("/uploadImage", upload.single("image"), (req, res, next) => {
  var fileinfo = req.file.filename;
  const newsId = 1;
  const statement = `UPDATE news SET image ='${fileinfo}' where newsId=${newsId}`;

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});

router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  console.log(filename);
  const file = fs.readFileSync(__dirname + "/../../images/" + filename);
  res.send(file);
});

router.post("/addNews/:reporterId", (req, res) => {
  const { category, title, article, city, locality } = req.body;
  const reporterId = req.params.reporterId;

  const body = {
    category: category,
    title: title,
    article: article,
    city: city,
    locality: locality,
    reporterId: reporterId,
  };

  News.create(body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
});

module.exports = router;
