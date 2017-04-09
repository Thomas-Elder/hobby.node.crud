'use strict';

var http = require('http');
var queryString = require('querystring');
var server;

/**
 * Creates a server.
 * The server responds to POST, GET, PUT and DELETE http methods. These are used to 
 * Create, Read, Update and Delete respectively. 
 * 
 * Additionally the server responds to OPTIONS http method. This is used by browsers 
 * to check whether a server supports CORS, and this one does.
 * 
 * @param {*} database - the database the server will access to respond to requests.
 *                       It is assumed that the database is an array of Objects with at least
 *                       and id attribute, which is a string.  
 */
var Server = function(database){

  server = http.createServer(function(request, response){

    var optionsHeaders = {}; 
    optionsHeaders['Access-Control-Allow-Origin'] = '*';
    optionsHeaders['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
    optionsHeaders['Access-Control-Allow-Headers'] = 'Content-Type';

    var responseHeaders = {};
    responseHeaders['Access-Control-Allow-Origin'] = '*';
    responseHeaders['Content-Type'] = 'application/json';

    switch(request.method) {            
          
      case 'OPTIONS':

        response.writeHead(200, optionsHeaders);
        response.end();

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

          var record = JSON.parse(body);
          
          database.push(record);
          response.writeHead(200, responseHeaders);
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
            response.writeHead(200, responseHeaders);
            response.write(JSON.stringify(database));
            response.end();
          } else {
            var id = JSON.parse(body).id;
            var record = database.find(function(r){
              return r.id === id;
            });

            response.writeHead(200, responseHeaders);
            response.write(JSON.stringify(record));
            response.end();
          }
        });

        break;

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
          var recordToUpdate = JSON.parse(body);
          console.log('recordtoupdate', recordToUpdate);
          console.log('db;', database);
          var record = database.find(function(r){
            return r.id === recordToUpdate.id;
          });
          record.name = recordToUpdate.name;
          
          response.writeHead(200, responseHeaders);
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
          var id = JSON.parse(body).id;

          var index = database.findIndex(function(r){
            return r.id === id;
          });

          database.splice(index, 1);
          
          response.writeHead(200, responseHeaders);
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