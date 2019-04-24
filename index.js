/*
Andy Wilson / itc230 / spring 2019
Assignment 2 - Let's Get Modular
*/

const http = require("http"); 
const fs = require("fs");
const books = require('./lib/books_model.js'); //import books module to use its data and methods
const qs = require('querystring'); //import querystring module to work with url

http.createServer((req,res) => {
  let url = req.url.split("?");  // separate route from query string
  let query = qs.parse(url[1]); // convert query string to object
  let path = url[0].toLowerCase();
  //const path = req.url.toLowerCase();

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

    case '/get':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Searching for: ' + query.title + '\n' + JSON.stringify(books.get(query.title)));
      break;

    case '/getall':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Here are all of the books: \n\n' + books.getAll());
      break;

    case '/delete':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(books.delete(query.title));
      break;

    case '/add':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(query.title + ' added! Books now contains: \n\n' + books.add(query.title, query.author, query.isbn));
      break;

    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);