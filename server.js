var config = require('./config.js');

var express = require('express');
var server = express();

server.use(express.static(config.site.root));
server.listen(config.site.port, function() {
	console.log('Server running on '+config.site.port+'...');
});