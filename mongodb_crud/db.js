const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
// name of our database
const dbname = "TWProject";
// location of where our mongoDB database is located
const url = "mongodb://localhost:27017";
// Options for mongoDB
const mongoOptions = {useNewUrlParser : true, useUnifiedTopology : true};

const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const Joi = require('joi');

const db = require("./db");
const collectionA = "Accounts";
const app = express();



const state = {
    db : null
};


// schema used for data validation for our todo document
const schema = Joi.object().keys({
    todo : Joi.string().required()
});

// parses json data sent to us by the user
app.use(bodyParser.json());


const connect = (cb) =>{
    // if state is not NULL
    // Means we have connection already, call our CB
    if(state.db)
        cb();
    else{
        // attempt to get database connection
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            // unable to get database connection pass error to CB
            if(err)
                cb(err);
            // Successfully got our database connection
            // Set database connection and call CB
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

// returns OBJECTID object used to
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

// returns database connection
const getDB = ()=>{
    return state.db;
}




module.exports = {getDB,connect,getPrimaryKey};
