var http = require('http');
var queryString = require('querystring');
var server;

/**
 * Creates a server.
 * The server responds to PUT, GET, POST and DELETE http methods. These are used to 
 * Create, Read, Update and Delete respectively. 
 * 
 * @param {*} database - the database the server will access to respond to requests.
 *                       It is assumed that the database is an array of Objects with at least
 *                       and id attribute, which is a string.  
 */
var Server = function(database){

  server = http.createServer(function(request, response){

    switch(request.method) {            
      
      case 'PUT':
        
        var body = "";

        request
        .on('error', function(error){
          console.error(error);
        })
        .on('data', function(data){
          body += data;
        })
        .on('end', function(){
          var record = queryString.parse(body);
          database.push(record);
          response.writeHead(200, {'Content-Type': 'application/json'});
          response.write(JSON.stringify(record));
          response.end();
        });
    
        break;
        
      case 'GET':

        var body = "";

        request
        .on('error', function(error){
          console.error(error);
        })
        .on('data', function(data){
          body += data;
        })
        .on('end', function(){

          if (body === '') {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(database));
            response.end();
          } else {
            var id = queryString.parse(body).id;
            var record = database.find(function(r){
              return r.id === id;
            });

            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(record));
            response.end();
          }
        });

        
        break;

      case 'POST':

        var body = "";

        request
        .on('error', function(error){
          console.error(error);
        })
        .on('data', function(data){
          body += data;
        })
        .on('end', function(){
          var recordToUpdate = queryString.parse(body);

          var record = database.find(function(r){
            return r.id === recordToUpdate.id;
          });
          record.name = recordToUpdate.name;
          
          response.writeHead(200, {'Content-Type': 'application/json'});
          response.write(JSON.stringify(record));
          response.end();
        });

        break;

      case 'DELETE':

        var body = "";

        request
        .on('error', function(error){
          console.error(error);
        })
        .on('data', function(data){
          body += data;
        })
        .on('end', function(){
          var id = queryString.parse(body).id;

          var index = database.findIndex(function(r){
            return r.id === id;
          });

          database.splice(index, 1);
          
          response.writeHead(200, {'Content-Type': 'application/json'});
          response.write(JSON.stringify(database));
          response.end();
        });

        break;
    }
  });
};

/**
 * Starts the server listening for requests on the specified port.
 * It logs when it's called the listen function on the specified port, 
 * and additionally when it's caught the 'listening' event.
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
 * Calls server.close();
 */
Server.prototype.stop = function(){
  server.close();
};

module.exports = Server;