const mongoose = require('mongoose');

const URL = process.env.MONGO_URL;

mongoose.connect(URL); 

const db = mongoose.connection;

db.on('connected', ()=>{console.log("Datbase is connected is successfully")})

db.on('disconnect', ()=>{console.log("database is disconnected")})

db.on('error', ()=>{console.log("error in connecting database")})

module.exports = db;
