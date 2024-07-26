// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var comments = [];

var server = http.createServer(function(request, response){
    // Get URL
    var parseUrl = url.parse(request.url);
    var pathName = parseUrl.pathname;
    if(pathName === '/'){
        fs.readFile('./index.html', function(err, data){
            if(err){
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                response.end('<h1>404 Not Found</h1>');
            }else{
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.end(data);
            }
        });
    }else if(pathName === '/comment'){
        var data = '';
        request.on('data', function(chunk){
            data += chunk;
        });
        request.on('end', function(){
            var comment = querystring.parse(data);
            comments.push(comment);
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.end(JSON.stringify(comments));
        });
    }else{
        response.writeHead(404, {
            'Content-Type': 'text/html'
        });
        response.end('<h1>404 Not Found</h1>');
    }
});

server.listen(3000, function(){
    console.log('Server is running...');
});