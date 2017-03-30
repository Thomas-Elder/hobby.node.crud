
var database = [
    {id: 1, name: 'Tom'},
    {id: 2, name: 'Tim'},
    {id: 3, name: 'Tum'},
    {id: 4, name: 'Tem'},
  ];
var port = 8080;
var Server = require('./server');
var server = new Server(database);

server.start(port);