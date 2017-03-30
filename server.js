var http = require('http');
var server;

/**
 * Creates a server. 
 * 
 * @param {*} database - the database the server will access to respond to requests.
 */
var Server = function(database){

  server = http.createServer(function(request, response){

    switch(request.url) {
        case '/':
          console.log('handle request for /');

          response.writeHead(200, {'Content-Type': 'text/html'});
          response.write("<h1>API</h1><ul><li>/create</li><li>/read</li><li>/update</li><li>/delete</li></ul>");
          response.end();          
          break;

        case '/create':
          console.log('handle request for /create');

          response.writeHead(200, {'Content-Type': 'application/json'});
          response.end();          
          break;

        case '/read':
          console.log('handle request for /read');

          response.writeHead(200, {'Content-Type': 'application/json'});
          response.write(JSON.stringify(database));
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
          response.end();
          break; 
    }
  });
};

/**
 * Starts the server listening for requests on the specified port.
 * 
 * @param {int} port - the port number the server will listen on.
 */
Server.prototype.start = function(port){

  server.listen(port, function(){
    console.log('Server starting... ');
  });

  server.on('listening', function(){
    console.log('Server listening on port:', port)
  });
};

/**
 * Stops the server listening. 
 */
Server.prototype.stop = function(){
  server.close();
};

module.exports = Server;