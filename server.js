// Retrieve
var MongoClient = require('mongodb').MongoClient;

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname ));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/home.html'));
});

app.listen("3001", () =>
  console.log("Server started at: http://localhost:3001")
);


// Connect to the db
MongoClient.connect("mongodb://localhost:27017/projectDB", {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});