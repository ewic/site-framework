//This will create the server and set it to listen on port 80.
var site_root = './site';  // Site root.
var port = 8080; // The port to listen on.

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(site_root)).listen(port, function(){
    console.log('Server running on '+port+'...');
});
