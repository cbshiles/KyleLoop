//<script src="http://code.jquery.com/jquery-1.11.1.min.js"> </script>

var http = require('http'),
    url = require('url'),
    fs = require('fs');

function direct(path){
    if (path == '/')
	path += 'index.html'
    return '.'+path
}

function doit(port){
    http.createServer(function(req, res){ //request & response
	var path = direct(url.parse(req.url).pathname)
	fs.readFile(path, function(err, data) {
	    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})	    
	    res.write(data)
	    res.end()})
    }).listen(port) //, 'localhost')
    console.log('Server running on '+port+'.')
}


doit(8888)
