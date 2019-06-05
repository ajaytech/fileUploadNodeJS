var express = require("express");
var multer = require("multer");
var app = express();
var cors = require("cors");
app.use(cors());
/*For other UI5 App Server*/
var allowedOrigins = [
  "http://192.168.0.102:8080/",
  "http://192.168.0.102:8080",
  "http://localhost:3000"
];
app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  }
});

//var upload = multer({ storage: storage }).single("myFileUpload");
var upload = multer({ storage: storage }).single("uploadCollection");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/photo", function(req, res) {
  //console.log(req);
  //JSON.stringify(req);
  //console.log(req);
  console.log("ok inside post");
  upload(req, res, function(err) {
    if (err) {
      console.log("error inside upload");
      return res.end("Error uploading file.");
    }
    console.log("Success inside upload");
    res.status(200).send('Success');
    res.end("File is uploaded");
  });
});

app.listen(3000, function() {
  console.log("Working on port 3000");
});
