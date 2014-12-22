

var http = require('http'),
url = require('url'),
fs = require('fs');

function route(req, res){
    console.log(req.method)

    var path = url.parse(req.url).pathname
    if (path == '/')
	path += 'index.html'

/*
also look and make sure there's no other parts of that url we want
*/
    var xten_pos = path.search(/\.[a-z]+$/)
    var name = path.substring(path.lastIndexOf('/')+1, xten_pos)
    var xten = path.substring(xten_pos+1)

    var readF //this function will be called to give response to the request

    function base(err, data) {
	if(err)	{return console.log(err)}
	res.end(data)
    }

    function include(url) {res.write('<script src="'+url+'"> </script>')}

    if(xten == 'html'){
	path = './client'+path
	readF = function(err, data) {
	    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
	    include('http://code.jquery.com/jquery-1.11.1.min.js')
	    include(name+'.js')
	    res.write(data)
	    res.end()}
    }
    else if(xten == 'js'){
//test if begging of name is srv_
	path = './client'+path
	readF = base
    }
    else if(xten == 'ogg'){
	path = './Music'+path
	readF = base
    }
    else {
	console.log(path)
	console.log("Unaccepted file type")
	return 1
    }
    fs.readFile(path, readF)
}

function doit(port){
    http.createServer(route).listen(port) //, 'localhost')
    console.log('Server running on '+port+'.')
}


doit(8888)
