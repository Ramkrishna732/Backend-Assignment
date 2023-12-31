const express=require('express');
const bodyParser=require('body-parser')
const app=express();

app.use(bodyParser.urlencoded({ extended: true }))


app.use(bodyParser.json())

//connecting to database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//making server
app.get('/', (req, res) => {
    res.json("Welcome to movie data");
});
require('./routes/movie.routes.js')(app);


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});