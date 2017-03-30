
var db = [
    {id: 1, name: 'Tom'},
    {id: 2, name: 'Tim'},
    {id: 3, name: 'Tum'},
    {id: 4, name: 'Tem'},
  ];

var Server = require('./server');
var server = new Server(db);
server.start();