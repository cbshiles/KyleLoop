var http = require('http'),
    url = require('url'),
    fs = require('fs');

http.createServer(function (req, res) {
   // parse URL
   var url_parts = url.parse(req.url);
   console.log(url_parts);
    res.writeHead(200, {'Content-Type': 'text/plain', 'charset' : 'utf-8'})
   if(url_parts.pathname == '/') {
      // file serving
      fs.readFile('../client/theirs.html', function(err, data) {
         res.end(data);
      });
   } else if(url_parts.pathname.substr(0, 5) == '/poll') {
     // polling code here
  }
}).listen(8080, 'localhost');
console.log('Server running.');
