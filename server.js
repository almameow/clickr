// Require Express so we can build an Express App
var express = require("express");

// Require path so we can use path functions (like path.join)
var path = require("path");

// Instantiate the App
var app = express();

// Require body-Parser for POST data
var bodyParser = require("body-Parser");
app.use(bodyParser.json());

// Require the mongoose config file
// Always require Mongoose before routes!! 
// Routes references files that reference mongoose, so requiring routes before mongoose will cause errors
require("./config/mongoose.js");

// Require and run the code from routes.js and pass it app so we can attach routing rules to our express application
require("./config/routes.js")(app);

// Set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, "./client")));

app.listen(8000, function(){
	console.log("listening on port 8000");
})