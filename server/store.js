var http = require('http')
var url = require('url')
var fs = require('fs')
var sys = require('sys')
var exec = require('child_process').exec

function route(req, res){

    var url_obj = url.parse(req.url)
    var path = url_obj.pathname
    if (path == '/')
	path += 'index.html'

   console.log(req.method)

    if (req.method == 'POST') {

	if (path == '/song_list') {
	    exec('cd ../Tunes; ls *.ogg', function (error, stdout, stderr) {
		if (error !== null){console.log('exec err: %s', error)}
		res.end(stdout)
	    })}

	return //This might have to go
    }

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

    console.log("xten: %s", xten)
    if(xten == 'html'){
	console.log(name)
	path = './client'+path
	readF = function(err, data) {
	    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
	    res.write(data)	    
	    include('http://code.jquery.com/jquery-1.11.1.min.js')
	    include(name+'.js')
	    res.end()}
    }
    else if(xten == 'js'){
	path = './client'+path
	readF = base
    }
    else if(xten == 'ogg'){
	path = '../Tunes'+path
	readF = base
    }
    else if (xten == 'form'){
	console.log(req.headers)
	console.log(url_obj.search)
	res.end('lets figure it out')
}
    else {
	console.log(path)
	console.log("Unaccepted file type")
	return 1
    }
    fs.readFile(path, readF)
}

function doit(port){
http.createServer(route).listen(port)  //localhost
console.log('Server running on %s.', port)
}

doit(8888)
