var config = require('./config.js');

var db = require('./db.js');

//ExpressJS server
var express = require('express');
var bodyParser = require("body-parser");
var server = express();

//Here we are configuring express to use body-parser as middle-ware.
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//Serve the static page
server.use(express.static(config.site.root));

//Db callout routes

//Inserting a document
server.post('/insert', function(req, res) {
	var result = db.insert(req.body.db, req.body.collection, JSON.parse(req.body.doc), function() {

	});

	res.send('success');
});

//Find all
server.get('/findall/:db/:collection', function(req, res) {
	var result = db.findAll(req.params.db, req.params.collection, function(response) {
		console.log(response);
	});
	console.log(result);
	res.send('findall');	
});

//Start listening
server.listen(config.site.port, function() {
	console.log('Server running on '+config.site.port+'...');
});

console.log(db.test('THIS IS A TEST'));