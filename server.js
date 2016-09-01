var config = require('./config.js');

//ExpressJS server
var express = require('express');
var server = express();

//Serve the static page
server.use(express.static(config.site.root));

server.use('/blog', express.static('./blog'));

//Start listening
server.listen(config.site.port, function() {
	console.log('Server running on '+config.site.port+'...');
});