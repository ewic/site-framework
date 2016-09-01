var config = require('./config.js');

//ExpressJS server
var express = require('express');
var bodyParser = require("body-parser");
var server = express();

//Here we are configuring express to use body-parser as middle-ware.
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//Serve the static page
server.use(express.static(config.site.root));

server.use('/blog', express.static('./blog'));

//Start listening
server.listen(config.site.port, function() {
	console.log('Server running on '+config.site.port+'...');
});