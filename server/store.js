var http = require('http')
var url = require('url')
var fs = require('fs')
var sys = require('sys')
var exec = require('child_process').exec
var qs = require('querystring')

function route(req, res){

    var url_obj = url.parse(req.url)
    var path = url_obj.pathname
    if (path == '/')
	path += 'index.html'

    if (req.method == 'POST') {
	if (path == '/song_list') {
	    exec('cd ../Tunes; ls *.ogg', function (error, stdout, stderr) {
		if (error !== null){console.log('Unix error: %s', error)}
		res.end(stdout)
	    })}

	if (path == '/upload')
	    res.end('fuck it for now')

	if (path == '/ytdl') {
	    var body = '';
            req.on('data', function (data) {
		body += data;
		// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
		if (body.length > 1e6) { 
                    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                    req.connection.destroy();
		}
            })
            req.on('end', function () {
		/*
		  var POST = qs.parse(body);
		  use POST
		*/
		var cmd = 'ytdl.sh "' + body + '"'
		exec(cmd, function (error, stdout, stderr) {
		    if (error !== null){res.end("Error loading file")}
		    else { exec('convert.sh', function (error, stdout, stderr) {
			if (error !== null){res.end("Error converting file")}
			else {res.end(stdout)}})}
		})})}
	
	return 0 
    }
    
	var xten_pos = path.search(/\.[a-z]+$/)
	var name = path.substring(path.lastIndexOf('/')+1, xten_pos)
	var xten = path.substring(xten_pos+1)

	function base(err, data) {
	    if(err)	{res.end(''); return console.log(err)}
	    res.end(data)
	}

	var readF = base //function that gives response to the request

	if(xten == 'html'){
	    function include(url) {res.write('<script src="'+url+'"> </script>')}
	    path = './client'+path
	    readF = function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
		include('http://code.jquery.com/jquery-1.11.1.min.js')
		res.write(data)	    
		include(name+'.js')
		res.end()}
	}
	else if(xten == 'js' || xten == 'css'){
	    path = './client'+path
	}
	else if(xten == 'ogg'){
	    path = '../Tunes'+path
	}
	else {
	    console.log("Unaccepted file type: %s", path)
	    return 1
	}
	fs.readFile(path, readF)
    }

    function doit(port){
	http.createServer(route).listen(port)  //localhost
	console.log('Server running on %s.', port)
    }

    doit(8888)
