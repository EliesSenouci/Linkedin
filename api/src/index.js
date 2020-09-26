// Import dependencies
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let apiRoutes = require("./api-routes");
const config = require('./db');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    bodyParser.urlencoded({
        extended: true
    });
    next();
});
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect(config.DB, { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db");
else
    console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 8081;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express and Docker'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running TodoList API on port " + port);
});