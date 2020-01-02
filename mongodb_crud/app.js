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

// read Accounts
app.get('/getAccounts',(req,res)=>{
    // get all Todo documents within our todo collection
    // send back to user as json
    db.getDB().collection(collectionA).find({}).toArray((err,documents)=>{
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
    db.getDB().collection(collectionA).findOneAndUpdate({_id : db.getPrimaryKey(todoID)},{$set : {todo : userInput.todo}},{returnOriginal : false},(err,result)=>{
        if(err)
            console.log(err);
        else{
            res.json(result);
        }
    });
});


//create
app.post('/',(req,res,next)=>{
    // Document to be inserted
    const userInput = req.body;

    // Validate document
    // If document is invalid pass to error middleware
    // else insert document within todo collection
    Joi.validate(userInput,schema,(err,result)=>{
        if(err){
            const error = new Error("Invalid Input");
            error.status = 400;
            next(error);
        }
        else{
            db.getDB().collection(collectionA).insertOne(userInput,(err,result)=>{
                if(err){
                    const error = new Error("Failed to insert Todo Document");
                    error.status = 400;
                    next(error);
                }
                else
                    res.json({result : result, document : result.ops[0],msg : "Successfully inserted Todo!!!",error : null});
            });
        }
    })
});



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
