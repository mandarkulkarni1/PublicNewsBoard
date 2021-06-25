const express = require("express");
const dbData = require("../../databaseCredential");
const utils = require("./../../utils");
const db = require("../../models");
const Reporters = db.Reporters;
const News = db.News;

const router = express.Router();


router.post("/addNews/reportnews/:reportedNewsId", (req, res) => {
    // const { category, createdAt } = req.body;
    // const newsId = req.params.reportedNewsId;
    // const readerId = 1;

    // const statement = `INSERT INTO reportednews (readerId, newsId, category, createdAt, updatedAt)
    //                   values ('${readerId}','${newsId}','${category}','${createdAt}',${createdAt})`;

    // dbData.query(statement, (err, data) => {
    //     res.send(utils.createResult(err, data));
    // });
    // console.log(body);

});