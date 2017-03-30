
var Server = require('../server');
var request = require('request');

describe('server', function(){

  var port = 8080;
  var url = 'http://localhost:' + port;
  var server;

  beforeEach(function(done){
    server = new Server();
    server.start();
    done();
  });

  afterEach(function(done){
    server.stop();
    done();
  });

  describe('connection', function(){
    
    it('should return 200 status code to a GET request', function(done){
      
      request.get(url).on('response', function(response){
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should return 200 status code to a POST request', function(done){
      
      request.post(url).on('response', function(response){
        expect(response.statusCode).toBe(200);
        done();
      });
    });  
  });

  describe('create', function(){

  });

  describe('read', function(){

  });

  describe('update', function(){

  });

  describe('delete', function(){

  });
});