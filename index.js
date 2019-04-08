/*
Andy Wilson / itc230 / spring 2019
Assignment 1 - Creating an initial web server and routes
*/

const http = require("http"); 
const fs = require("fs");

http.createServer((req,res) => {
  const path = req.url.toLowerCase();

  switch(path) {
    case '/':
      fs.readFile("public/home.html", (err, data) => {
        if (err) return console.error(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data.toString());
      });
      break;

    case '/about':
      fs.readFile("public/about.html", (err, data) => {
        if (err) return console.error(err);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(data.toString());
      });
    break;

    case '/test':
      fs.readFile("test.html", (err, data) => {
        if (err) return console.error(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data.toString());
     });
     break;

    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);