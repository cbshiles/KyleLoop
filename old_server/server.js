var http = require('http'),
    url = require('url'),
    fs = require('fs');

http.createServer(function (req, res)
{
    res.writeHead(200, {"Content-Type": "text/plain"});
    console.log(url.parse(req.url))
    fs.readFile('./index.html', function(err, data) {
	console.log(typeof data)
	//res.write(data)
	res.end()
	})
}).listen(8080, 'localhost')

/*
    response.writeHead(200, {"Content-Type": "text/plain"})
    response.write("Howdy mundo")
    response.end()
*/
