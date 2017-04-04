var http = require('http');
var express = require('express');
var app = express();

app.use(express.static('./'));

app.listen(8181, function(){
  console.log('listening on 8181... ');
});