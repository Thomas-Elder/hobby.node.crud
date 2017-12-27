'use strict';

var http = require('http');
var queryString = require('querystring');
var server;

/**
 * Initialises the server and defines how requests are handled.
 * 
 * @param {array} database - an array of objects to use as the database.
 *                           The only necessary field in the array is an 'id' field
 *                           which is used to identify and compare objects. 
 */
var init = function(database){

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
 * Starts the server listening on the specified port.
 * 
 * @param {integer} port - the port number for the server to listen on.
 */
var start = function(port){

  server.listen(port, function(){
    console.log('Server starting... ');
  });

  server.on('listening', function(){
    console.log('Server listening on port:', port)
  });
};

/**
 * Closes the server. 
 */
var stop = function(){
  server.close();
};

module.exports = {
  init:init,
  start:start,
  stop:stop
}; 