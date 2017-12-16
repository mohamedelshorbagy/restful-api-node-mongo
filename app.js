const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const mongoose = require('mongoose');


const config = require('./config/database')

// Database Setup
mongoose.connect(config.database)


mongoose.connection.on('connected' , () => {
    console.log('Connected To Database : ' + config.database);

})





// Initializing Our App
const app = express();

// Importing Users
const users = require('./routes/users');

// Port Number
const PORT_NUMBER = 3000;

// CORS MiddleWare
app.use(cors());

// Body Parser MiddleWare
app.use(bodyParser.json());


// To Use a Root File
app.use(express.static(path.join(__dirname , 'public')));




// Users Routes
app.use('/users' , users)


app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.get('/' , (req , res) => {

    res.send('You are Now in Root Route');

})


// Listen to Server
app.listen(PORT_NUMBER , () => {
    console.log('You are Listening in Port : ' + PORT_NUMBER);
})







