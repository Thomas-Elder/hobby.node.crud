
var server = require('../server');
var request = require('request');

describe('server', function(){

  var port = 8080;
  var url = 'http://localhost:' + port;
  //var server;

  beforeEach(function(done){

    var database = [
      {id: '1', name: 'Tom'},
      {id: '2', name: 'Tim'},
      {id: '3', name: 'Tum'},
      {id: '4', name: 'Tem'},
    ];

    server.init(database);
    server.start(port);
    done();
  });

  afterEach(function(done){
    server.stop();
    delete database;
    done();
  });

  describe('OPTIONS', function(){

    it('should return status 200, and have appropriate headers for OPTIONS requests', function(done){
      
      request( { method: 'OPTIONS', uri: url } )
        
      .on('response', function(response){
        
        var body = "";

        response
        .on('error', function(error){
          console.error(error);
        })
        .on('data', function(data){
          body += data;
        })
        .on('end', function(){
          expect(response.statusCode).toBe(200);
          expect(response.headers['access-control-allow-origin']).toBe('*');
          expect(response.headers['access-control-allow-methods']).toBe('POST, GET, PUT, DELETE, OPTIONS');
          expect(response.headers['access-control-allow-headers']).toBe('Content-Type');
          done();
        });
      });
    });
  });

  describe('POST', function(){

    it('should return status 200 for POST requests', function(done){
      
      var expected = {id:'5', name:'Tam'};
      
      request({ method: 'POST', uri: url, body:expected, json:true })
      
      .on('response', function(response){
        
        var body = "";

        response
        .on('error', function(error){
          console.error(error);
        }) 
        .on('data', function(data){
          body += data;
        })
        .on('end', function(){
          expect(response.statusCode).toBe(200);
          expect(body).toEqual(JSON.stringify(expected));
          done();
        });
      });
    });
  });

  describe('GET', function(){

    it('should return all database records if no parameters are given', function(done){
      
      var expected = [
        {id: '1', name: 'Tom'},
        {id: '2', name: 'Tim'},
        {id: '3', name: 'Tum'},
        {id: '4', name: 'Tem'},
      ];

      request({ method: 'GET', uri: url })
      
      .on('response', function(response){
        
        var body = "";
        
        response
        .on('error', function(error){
          console.error(error);
        })
        .on('data', function(data){
          body += data;
        })
        .on('end', function(){
          expect(response.statusCode).toBe(200);
          expect(body).toEqual(JSON.stringify(expected));
          done();
        });
      });
    });

    it('should return the record matching id with the given parameter', function(done){
      
      var expected ={id: '3', name: 'Tum'};
      
      request({ method: 'GET', uri: url, body:{id:'3'}, json:true })

      .on('response', function(response){
        
        var body = "";

        response
        .on('error', function(error){
          console.error(error);
        })
        .on('data', function(data){
          body += data;
        })
        .on('end', function(){
          expect(response.statusCode).toBe(200);
          expect(body).toEqual(JSON.stringify(expected));
          done();
        });
      });
    });
  });

  describe('POST', function(){

    it('should return the updated record', function(done){

      var expected = {id:'3', name:'Tam'};

      request({ method: 'POST', uri: url, body:expected, json:true })
      
      .on('response', function(response){

        var body = "";

        response
        .on('error', function(error){
          console.error(error);
        })
        .on('data', function(data){
          body += data;
        })
        .on('end', function(){
          expect(response.statusCode).toBe(200);
          expect(body).toEqual(JSON.stringify(expected));
          done();
        });
      });
    });
  });

  describe('DELETE', function(){

    it('should return all database records', function(done){

      var expected = [
        {id: '1', name: 'Tom'},
        {id: '2', name: 'Tim'},
        {id: '4', name: 'Tem'},
      ];

      request({ method: 'DELETE', uri: url, body:{id:'3'}, json:true })
      
      .on('response', function(response){
        
        var body = "";

        response
        .on('error', function(error){
          console.error(error);
        })
        .on('data', function(data){
          body += data;
        })
        .on('end', function(){
          expect(response.statusCode).toBe(200);
          expect(body).toEqual(JSON.stringify(expected));
          done();
        });
      });
    });
  });
});