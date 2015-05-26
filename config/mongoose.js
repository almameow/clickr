// This is /config/mongoose.js
// This config file connects MongoDb and loads all our models. We do this here because we don't want to have to connect the DB every time we require a models

// Require mongoose
var mongoose = require("mongoose");

// Require file-system so that we can load, read, require all of the model files 
var fs = require("fs");

// Connect to the DB
mongoose.connect('mongodb://localhost/clickr');

// Specify the path to all of the models
var models_path = __dirname + "/../server/models";

// Read all of the files in the models_path and for each one check if it is a javascript file before requiring it
fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf(".js") > 0 ) {
		require(models_path + "/" + file );
	}
})