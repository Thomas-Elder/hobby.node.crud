var http = require('http');
var port = 8080;
var server;

var Server = function(db){

  server = http.createServer(function(request, response){

    switch(request.url) {
        case '/create':
          console.log('handle request for /create');

          response.writeHead(200, {'Content-Type': 'application/json'});
          response.end();          
          break;
        case '/read':
          console.log('handle request for /read');

          response.writeHead(200, {'Content-Type': 'application/json'});
          response.write(JSON.stringify(db));
          response.end();
          break;
        case '/update':
          console.log('handle request for /update');

          response.writeHead(200, {'Content-Type': 'application/json'});
          response.end();
          break;
        case '/delete':
          console.log('handle request for /delete');

          response.writeHead(200, {'Content-Type': 'application/json'});
          response.end();
          break;
        default:
          response.writeHead(404, {'Content-Type': 'application/json'});
          break; 
    }
  });
};

Server.prototype.start = function(){

  server.listen(port, function(){
    console.log('Server listening on port:', port);
  });
};

Server.prototype.stop = function(){
  server.close();
};

module.exports = Server;