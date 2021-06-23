const express = require("express");
const router = express.Router();
const dbData = require("../../databaseCredential");
const utils = require("./../../utils");
const crypto = require("crypto-js");
const db = require("../../models");
const secretKey = require("../../secretKey");
const Admin = db.Admin;
const jwt = require("jsonwebtoken");

// router.post("/signup", (request, response) => {
//   //  const {password}=request.body.password
//   //  const encryptedPassword = crypto.SHA256(password)
//   const admin = {
//     userName: request.body.userName || "default",
//     password: request.body.password.toString() || "default",
//     email: request.body.email,
//   };
//   console.log(admin);
//   // const encryptedPassword = crypto.SHA256(password)

//   Admin.create(admin)
//     .then((data) => {
//       response.send(data);
//     })
//     .catch((err) => {
//       response.status(500).send({
//         message: err.message || "some error occured",
//       });
//     });
// });

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  // const encryptedPassword = crypto.SHA256(password);
  const statement = `select adminId, userName, email from admins where email = '${email}' and password = '${password}'`;
  dbData.query(statement, (error, data) => {
    if (error) {
      res.send({ status: "error", error: error });
    } else {
      if (data.length == 0) {
        res.send({ status: "error", error: "admin does not exist" });
      } else {
        // const admin = data[0];
        // const token = jwt.sign({ id: admin["adminId"] }, secretKey.secret);

        res.send(
          utils.createResult(error, data)
        );
      }
    }
  });
});

//----------------------------------------------------------------------------------------------------//
//                                 Get De-activated reporters
//----------------------------------------------------------------------------------------------------//
router.get("/reportersToApprove", (req, res) => {
  const statement = "SELECT * FROM reporters where isApproved=false";

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});
//----------------------------------------------------------------------------------------------------//
//                                  activate reporter
//----------------------------------------------------------------------------------------------------//
router.put("/approveReporter/:reporterId", (req, res) => {


  const { isApproved } = req.body;

  const reporterId = req.params.reporterId;
  const statement = `UPDATE reporters SET isApproved=${isApproved} where reporterId=${reporterId}`;

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});

module.exports = router;

