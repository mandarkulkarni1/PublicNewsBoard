const express = require("express");
const router = express.Router();
const dbData = require("../../databaseCredential");
const utils = require("./../../utils");
const crypto = require("crypto-js");
const db = require("../../models");
const secretKey = require("../../secretKey");
const Admin = db.Admin;
const jwt = require("jsonwebtoken");
const body = require("../../Email/Emailbody");
const reject = require("../../Email/EmailReject");
const mailer = require("../../Email/nodemailer");
const accept = require("../../Email/EmailAccept");

router.post("/signup", (request, response) => {
    //  const {password}=request.body.password
    //  const encryptedPassword = crypto.SHA256(password)
    const admin = {
        userName: request.body.userName || "default",
        password: crypto.SHA256(request.body.password).toString() || "default",
        email: request.body.email,
    };
    console.log(admin);
    // const encryptedPassword = crypto.SHA256(password)

    Admin.create(admin)
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
    console.log("Hello" + req.body.email);
    const { email, password } = req.body;
    result = {};
    const statement = `select adminId, userName, email from admins where email = '${email}' and password = '${password}'`;

    dbData.query(statement, (err, data) => {
        console.log(data);
        if (err) {
            result["status"] = "error";
            result["error"] = err;
        } else {
            if (data.length == 0) {
                result["status"] = "error";
                result["error"] = "invalid crendential";
            } else {
                const admin = data[0];
                const token = jwt.sign({ id: admin["adminId"] }, secretKey.secret);
                result["status"] = "success";
                result["data"] = {
                    userName: admin["userName"],
                    token: token,
                };
            }
            console.log(result);
        }
        res.send(result);
    });
});

router.get("/adminNews/:newsId", (req, res) => {
    const newsId = req.params.newsId;

    const statement = `select * from news where newsId=${newsId}`;
    dbData.query(statement, (err, data) => {
        res.send(utils.createResult(err, data));
    });
});

router.post("/rejected", (req, res) => {
    const id = req.body.newsId;
    const reporterId = req.body.reporterId;
    const reason = req.body.reason;
    const title = req.body.title;

    const statement = `delete from news where newsId=${id}`;

    dbData.query(statement, (err, result) => {
        console.log(result);
    });
    const query = `select * from reporters where reporterId=${reporterId}`;

    dbData.query(query, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            name = data[0].userName;
            email = data[0].email;
            var msg = reject(name, reason, title);
            subject = "Your Post Rejected ";
            mailer.sendEmail(email, subject, msg, (mailError, mailResult) => {
                console.log(mailError, mailResult);
            });
        }
    });
});

router.post("/accepted", (req, res) => {
    const id = req.body.newsId;
    const reporterId = req.body.reporterId;
    const title = req.body.title;
     
    const statement = `UPDATE news
    SET isApproved = true
    WHERE newsId=${id}`;
   console.log(statement)
    dbData.query(statement, (err, result) => {
        console.log(result);
    });
    const query = `select * from reporters where reporterId=${reporterId}`;

    dbData.query(query, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            name = data[0].userName;
            email = data[0].email;
            var msg = accept(name, title);
            subject = "Your Post Approved ";
            mailer.sendEmail(email, subject, msg, (mailError, mailResult) => {
                console.log(mailError, mailResult);
            });
        }
    });
});

router.get("/toBeApprov", (req, res) => {
    const statement = `select * from news where isApproved=false`;
    dbData.query(statement, (err, data) => {
        res.send(utils.createResult(err, data));
    });
});

router.get("/mostlyReadNews", (req, res) => {
    value = [];
    title = [];
    state = {
        labels: [],
        datasets: [{
            label: "Read Count",
            backgroundColor: [
                "#B21F00",
                "#C9DE00",
                "#2FDE00",
                "#00A6B4",
                "#6800B4",
                "#474a42",
                "#12063d",
                "#4c0acf",
                "#04472e",
                "#09ab67",
                "#1c2421",
            ],
            hoverBackgroundColor: [
                "#501800",
                "#4B5000",
                "#175000",
                "#003350",
                "#35014F",
                "#5a7068",
                "#314c85",
                "#610c2e",
                "#b05500",
                "#8a852d",
            ],

            data: [],
        }, ],
    };
    const statement = `select views,title
    from news
    order by views desc
    limit 10`;

    dbData.query(statement, (err, data) => {
        data.forEach((element) => {
            console.log(data);
            value.push(element.views);
            title.push(element.title);
        });
        console.log(title);
        console.log(value);
        state.labels = title;
        state.datasets[0].data = value;
        res.send(state);
    });
});

router.get("/approved/:id", (request, response) => {
    const { id } = request.params;
    var name = "";
    var email = "";
    const statement = `select * from reporters where reporterId=${id}`;

    dbData.query(statement, (err, data) => {
        name = data[0].userName;
        email = data[0].email;
    });
    const query = `update reporters set isApproved=TRUE where reporterId=${id}`;

    dbData.query(query, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
            var msg = body(name, id);
            subject = "You are approved Successfully";
            mailer.sendEmail(email, subject, msg, (mailError, mailResult) => {
                console.log(mailError, mailResult);
            });
        }
    });
});

router.get("/allRepo", (req, res) => {
    const statement = `select * from reporters where isApproved=true`;

    dbData.query(statement, (err, data) => {
        res.send(utils.createResult(err, data));
    });
});
router.get("/reportedNews", (req, res) => {
    const query = `SELECT count(newsId) as reportCount , newsId from reportednews group by newsId;`;

    dbData.query(query, (err, data) => {
        res.send(utils.createResult(err, data));
    });
});

router.get("/seeReport/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT *  from reportednews where newsId=${id}`;

    dbData.query(query, (err, data) => {
        res.send(utils.createResult(err, data));
    });
});

router.get("/Reader/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT *  from readers where readerId=${id}`;

    dbData.query(query, (err, data) => {
        res.send(utils.createResult(err, data));
    });
});

router.get("/ignore/:id", (req, res) => {
    const { id } = req.params;
    const query = `delete from reportednews where newsId=${id}`;

    dbData.query(query, (err, data) => {
        res.send(utils.createResult(err, data));
    });
});

router.get("/allReader", (req, res) => {
    const query = `select * from readers`;

    dbData.query(query, (err, data) => {
        res.send(utils.createResult(err, data));
    });
});

router.get("/totalReporter", (req, res) => {
    const query = `select * from reporters where isApproved=true`;
    dbData.query(query, (err, data) => {
        res.send(utils.createResult(err, data));
    });
});

router.get("/takeAction/:id", (req, res) => {
    const { id } = req.params;
    const query = `delete from reportednews where newsId=${id}`;
    const statement = `delete from news where newsId=${id}`;

    dbData.query(query, (error, response) => {
        if (response) {
            dbData.query(statement, (err, data) => {
                res.send(utils.createResult(err, data));
            });
        } else {
            res.send(error);
        }
    });
});

router.get("/viewReader/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT *  from readers where readerId=${id}`;

    dbData.query(query, (err, data) => {
        res.send(utils.createResult(err, data));
    });
});

router.get("/getParticularNews/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT *  from news where reporterId=${id}`;

    dbData.query(query, (err, data) => {
        res.send(utils.createResult(err, data));
    });
});

router.get("/approvedRepo", (req, res) => {

  const query = `select * from reporters where isApproved=false`;

  dbData.query(query, (err, data) => {

      res.send(utils.createResult(err, data));

  });

});

module.exports = router;