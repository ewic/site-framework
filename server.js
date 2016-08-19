var config = require('./config.js');

//This will create the server and set it to listen on port 80.
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(config.site.root)).listen(config.site.port, function(){
    console.log('Server running on '+config.site.port+'...');
});

// var restify = require('restify');
// var restServer = restify.createServer();
// restServer.use(restify.bodyParser());

// restServer.listen(config.database.port, function() {
// 	console.log('Database server app listening on '+config.database.port);
// });

// var db = require('./db')(restServer);

// var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/myapp');
// var Schema = mongoose.Schema;

// // Create a schema for our data
// var MessageSchema = new Schema({
//   message: String,
//   date: Date
// });
// // Use the schema to register a model with MongoDb
// mongoose.model('Message', MessageSchema); 
// var Message = mongoose.model('Message');