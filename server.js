var http = require('http');
var port = 8080;

var db = [
    {id: 1, name: 'Tom'},
    {id: 2, name: 'Tim'},
    {id: 3, name: 'Tum'},
    {id: 4, name: 'Tem'},
];

var Server = function(){

    server = http.createServer(function(request, response){

        switch (request.method) {
            case 'GET': 
                console.log('handle get request...');

                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(JSON.stringify(db));
                response.end();
                break;

            case 'POST':
                console.log('handle post request...');

                var body = "";
                request.on('data', function(data){
                    body += data;
                });

                request.on('end', function(){
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.write('<h1>Hello POST!</h1>');
                    response.write('<p>You posted:'+ body + '</p>');
                    response.end();
                });
                break;
        }
    });

    server.listen(port, function(){
        console.log('server listening on port:', port);
    });
};

module.exports = Server;