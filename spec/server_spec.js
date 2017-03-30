
var Server = require('../server');
var request = require('request');

describe('server', function(){
  
  var db = [
    {id: 1, name: 'Tom'},
    {id: 2, name: 'Tim'},
    {id: 3, name: 'Tum'},
    {id: 4, name: 'Tem'},
  ];

  var port = 8080;
  var url = 'http://localhost:' + port;
  var server;

  beforeEach(function(done){
    server = new Server(db);
    server.start();
    done();
  });

  afterEach(function(done){
    server.stop();
    done();
  });

  describe('connection', function(){
    
    it('should return 200 status code to a request for /create', function(done){
      
      request.get(url + '/create').on('response', function(response){
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should return 200 status code to a request for /read', function(done){
      
      request.get(url + '/read').on('response', function(response){
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should return 200 status code to a request for /update', function(done){
      
      request.get(url + '/update').on('response', function(response){
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('should return 200 status code to a request for /delete', function(done){
      
      request.get(url + '/delete').on('response', function(response){
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe('create', function(){

  });

  describe('read', function(){

    it('should return the full list of data to a request for /read', function(done){

      var expected = db;

      request.get(url + '/read').on('response', function(response){
        
        var body = "";
        response.on('data', function(data){
          body += data;
        });

        response.on('end', function(){
          expect(body).toEqual(JSON.stringify(expected));
          done();
        });
      });
    });
  });

  describe('update', function(){

  });

  describe('delete', function(){

  });
});