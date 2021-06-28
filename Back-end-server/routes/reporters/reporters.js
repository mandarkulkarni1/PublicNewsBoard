const express = require("express");
const dbData = require("../../databaseCredential");
const utils = require("./../../utils");
const crypto = require("crypto-js");
const db = require("../../models");
const secretKey = require("../../secretKey");
const jwt = require("jsonwebtoken");
const Reporters = db.Reporters;
const News = db.News;
const ReportedNews = db.ReportedNews;

const multer = require("multer");
const upload = multer({ dest: "images/" });
const fs = require("fs");

const { request } = require("express");
const Videos = db.Videos;


const router = express.Router();

router.post('/signup', (request, response) => {
  //  const {password}=request.body.password
  //  const encryptedPassword = crypto.SHA256(password)
  result = {}
  const reporters = {
    userName: request.body.userName || "default",
    password: crypto.SHA256(request.body.password).toString() || "default",
    email: request.body.email,
    phone: request.body.phone,
    isApproved: false,  //Server is doing logic for this
    city: request.body.city
  };
 
  // const encryptedPassword = crypto.SHA256(password)
  const statement = `select email from reporters where email='${request.body.email}'`
  dbData.query(statement, (err, data) => {

    if (err) {
      result['status'] = 'error'
      result['error'] = err
    }
    else if (data.length == 0) {

      Reporters.create(reporters)
        .then(data => {
          result['status'] = 'success'
          result['data'] = data
         
        })
        .catch(err => {
          result['status'] = 'error'
          result['error'] = err.message

        })

    }
    else {
    
      result['status'] = "error"
      result['error'] = "Already registered with this email address"
    }

    response.send(result)

  })

})

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  result = {};
  const encryptedPassword = crypto.SHA256(password);
  const statement = `select * from reporters where email = '${email}' and password = '${encryptedPassword}'`;

  dbData.query(statement, (err, data) => {
    if (err) {
      result["status"] = "error";
      result["error"] = err;
    } else {
      if (data.length == 0) {
        result["status"] = "error";
        result["error"] = "Invalid crendential";
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
            city: reporters["city"],
            email: reporters["email"],
            token: token,
          };
        }
        // console.log(result);
      }
    }
    res.send(result);
  });
});

router.post("/addNews/:reporterId", upload.single('image'), (req, res) => {
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


router.get('/image/:filename', (request, response) => {
  const { filename } = request.params
  const path = __dirname + '/../../images/' + filename
  const data = fs.readFileSync(path)
  response.send(data)
})

var storageVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'videos/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true)
  }
})

var uploadVideo = multer({ storage: storageVideo }).single("file")

router.post("/videoUpload", (req, res) => {

  uploadVideo(req, res, err => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })

});


router.post("/video", (request, response) => {
  const video = {
    reporterId: request.body.reporterId,
    title: request.body.title,
    category: request.body.category,
    city: request.body.city,
    video: request.body.filePath

  };


  Videos.create(video)
    .then(data => {

      response.send(data)

    })
    .catch(err => {
      response.status(500).send({
        message: err.message || "some error occured"
      })
    })


});

router.get('/videos/:filename', (request, response) => {
  const { filename } = request.params

  const path = __dirname + '/../../videos/' + filename
  const data = fs.readFileSync(path)
  response.send(data)
})

router.get('/videos', (request, response) => {
  const statement = `SELECT * FROM videos order by updatedAt desc `;

  dbData.query(statement, (err, data) => {
    response.send(utils.createResult(err, data));
  });
})

router.get("/reporterNews/:id", (req, res) => {

  const { id } = req.params
  const statement = `SELECT * FROM news where reporterId=${id}`;

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });

});

router.get("/news/top20", (req, res) => {
  const statement = "SELECT * FROM news ORDER BY views desc limit 20";
  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});

router.get("/news", (req, res) => {
  const statement = "SELECT * FROM news ORDER BY updatedAt DESC";

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});

router.get("/getArticle/:id", (req, res) => {
  const { id } = req.params
  const statement = `SELECT * FROM news where newsId=${id}`;

  dbData.query(statement, (err, data) => {
    res.send(utils.createResult(err, data));
  });
});


module.exports = router;