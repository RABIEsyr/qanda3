const app = require("express")();
const http = require("http").Server(app);
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require('fs');
const path = require("path");

const config = require('./config/config');
const db = require('./db/db');

const addQuestionRoute = require('./routes/current-project/add-question');

app.use(morgan("dev"));
app.use(cors());
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));


app.use('/add-question', addQuestionRoute);

const express = require("express");
app.use(express.static(__dirname + '/dist'));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'))
})

//  mongoose.Promise = global.Promise;
// const ConnectionUri = config.db;
// mongoose.connect(ConnectionUri, (err) => {
//   if (err) {
//     console.log("Error in connecting to Mongo DB !!");
//     throw err;
//   }
//   console.log("successfully connected to database ..");
// });

const uri = "mongodb+srv://jan:jano1111@cluster0.5kxltgc.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb+srv://ghadeer:2oeCMEoKXs5kDdBm@cluster0.avz2zcr.mongodb.net/";

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(uri,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
const port = config.port || 8000 ||  process.env.PORT;
http.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server running on port ${port}`);
  }
});