const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const secretKey = require("./secretKey");
const utils = require("./utils");
const jwt = require("jsonwebtoken");

db.sequelize.sync();

const adminRouter = require("./routes/admin/admin");
const reporterRouter = require("./routes/reporters/reporters");
const readerRouter =  require("./routes/readers/readers")

function authorized(request, response, next) {
  if (
    request.url == "/reporters/signin" ||
    request.url == "/reporters/signup" ||
    request.url == "/admin/signin" ||
    request.url == "/admin/signup" ||
    request.url.startsWith("/readers")
  ) {
    next();
  } else {
    const token = request.headers["token"];
    console.log(token);
    if (!token) {
      response.status(401);
      response.send(utils.createResult("token is missing"));
    } else {
      try {
        const data = jwt.verify(token, secretKey.secret);
        // console.log(data.id)
        request.reporterId = data.id;
        // console.log(userId,data.id)
        next();
      } catch (ex) {
        response.status(401);
        response.send(utils.createResult("invalid token"));
      }
    }
  }
}

const app = express();
app.use(cors("*"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(authorized);

app.use("/reporters", reporterRouter);
app.use("/admin", adminRouter);
app.use("/readers",readerRouter);

app.listen("8080", () => {
  console.log("Server is running at port number 8080");
});
