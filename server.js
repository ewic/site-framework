var config = require('./config.js');

//This will create the server and set it to listen on port 80.
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(config.site.root)).listen(config.site.port, function(){
    console.log('Server running on '+config.site.port+'...');
});