const mongoose  = require('mongoose');
require('dotenv').config();
// define ongodb connection url

const mongoURL = process.env.MONGODB_URL_LOCAL;

const mongoURL = process.env.MONGODB_URL;
// setup mongodb connection

mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology: true
})

// mongoose maintains a default connection bject representing mongodb connection
const db = mongoose.connection;

//defining event listner for database connection

db.on('connected',()=>{
    console.log('connected to mongodb server')
})
db.on('error',()=>{
    console.log('error to mongodb server')
})
db.on('disconnected',()=>{
    console.log('disconnected to mongodb server')
})

// export the databse connection
module.exports = db;