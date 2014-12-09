//<script src="http://code.jquery.com/jquery-1.11.1.min.js"> </script>

var http = require('http'),
    url = require('url'),
    fs = require('fs');

function doit(path, port){
    http.createServer(function(req, res){ //request & response

	fs.readFile(path, function(err, data) {
	    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})	    
	    res.write(data)
	    //res.write("<html><body><p>fdf dfdddd ddfd</p></body></html>")
	    res.end()})
    }).listen(port, 'localhost')
    console.log('Server running.')
}


doit('./cherry.html', 8888)
