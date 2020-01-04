const express = require('express');
const bodyParser = require("body-parser");

const path = require('path');
const Joi = require('joi');

const db = require("./db");
const collectionI = "Images";
const collectionA = "Accounts";
const app = express();
var cssHeaders = {'Content-Type': 'text/css'};



// adding class
app.use(express.static(__dirname));



// schema used for data validation for our todo document
const schema = Joi.object().keys({
    todo : Joi.string().required()
});


// parses json data sent to us by the user
app.use(bodyParser.json());


// serve static html file to user
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/membri.html',(req,res)=>{
  res.sendFile(path.join(__dirname, 'membri.html'));
});

app.get('/LoginForm.html',(req,res)=>{
  res.sendFile(path.join(__dirname, 'LoginForm.html'));
});

app.get('/RegisterForm.html',(req,res)=>{
  res.sendFile(path.join(__dirname, 'RegisterForm.html'));
});

app.get('/home2.html',(req,res)=>{
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/home.html',(req,res)=>{
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/admitere.html',(req,res)=>{
  res.sendFile(path.join(__dirname, 'admitere.html'));
});


app.get('/bac.html',(req,res)=>{
  res.sendFile(path.join(__dirname, 'bac.html'));
});


app.get('/facultati.html',(req,res)=>{
  res.sendFile(path.join(__dirname, 'facultati.html'));
});




// read
app.get('/getTodos',(req,res)=>{
    // get all Todo documents within our todo collection
    // send back to user as json
    db.getDB().collection(collectionI).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
});


// update
app.put('/:id',(req,res)=>{
    // Primary Key of Todo Document we wish to update
    const todoID = req.params.id;
    // Document used to update
    const userInput = req.body;
    // Find Document By ID and Update
    db.getDB().collection("Accounts").findOneAndUpdate({_id : db.getPrimaryKey(todoID)},{$set : {email : userInput.email}},(err,result)=>{
        if(err)
            console.log(err);
        else{
            res.json(result);
        }
    });
});


//create


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TWProject',  { useNewUrlParser: true , useUnifiedTopology: true });
var db2=mongoose.connection;
db2.on('error', console.log.bind(console, "connection error"));
db2.once('open', function(callback){
    console.log("connection succeeded");
})




app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));




app.post('/sign_up', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;

    var data = {
        "name": name,
        "email":email,
        "password":pass,
        "phone":phone
    }


     db2.collection('Accounts').findOne({'email': email}, function(err, resm){
        console.log(resm); // show found account details
        if(resm != null){
          console.log( "This email is used in another account");
          return res.redirect('LoginForm.html')
        }
        else{
          db2.collection('Accounts').insertOne(data,function(err, collection){
              if (err) {
                throw err;
                console.log("error");
              }
              console.log("Record inserted Successfully");
              return res.redirect('home.html')
          });
        }
        if(err) throw err;
    });

})




// LoginForm

app.post('/login', function(req,res){
    var email =req.body.email;
    var pass = req.body.password;


     db2.collection('Accounts').findOne({'email': email}, function(err, resm){
        console.log(resm); // show found account details
        if(err) throw err;
        if(resm == null){
          console.log( "This email is not used in an account");
          return res.redirect('RegisterForm.html')
        }
        else{
          if(resm.password == pass){
            console.log("Succesfully connected!!!");
            return res.redirect('home.html');
          }
          else{
             console.log ("Wrong password. Try again!");
             return res.redirect('LoginForm.html');
           }
        }
    });

})







//delete
app.delete('/:id',(req,res)=>{
    // Primary Key of Todo Document
    const todoID = req.params.id;
    // Find Document By ID and delete document from record
    db.getDB().collection(collection).findOneAndDelete({_id : db.getPrimaryKey(todoID)},(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    });
});




db.connect((err)=>{
    // If err unable to connect to database
    // End application
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    // Successfully connected to database
    // Start up our Express Application
    // And listen for Request
    else{
        app.listen(3001,()=>{
            console.log('connected to database, app listening on port 3001');
        });
    }
});
