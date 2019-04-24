/*
Andy Wilson / itc230 / spring 2019
Assignment 3 - Express
*/


'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const app = express();

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

const books = require('./lib/books_model.js'); //import books module to use its data and methods
const qs = require('querystring'); //import querystring module to work with url


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions


// // send static file as response
// app.get('/', (req, res) => {
//   res.type('text/html');
//   res.sendFile(__dirname + '/public/home.html'); 
//  });

 // send content of 'home' view
app.get('/', (req,res) => {
  res.render('home');
 });

 app.get('/about', (req, res) => {
  res.type('text/html');
  res.sendFile(__dirname + '/public/about.html'); 
 });
 
 // send content of 'home' view
app.get('/get', (req,res) => {
  let result = books.get(req.query.title);
  res.render('details', {title: req.query.title, result: JSON.stringify(result) });
 });

//  app.get('/get', (req, res) => {
//   res.type('text/plain');
//   res.send('Searching for: ' + req.query.title + '\n' + JSON.stringify(books.get(req.query.title)));
//  });

app.get('/getall', (req,res) => {
  let result = books.getAll();
  res.render('details', {allbooks: result});
 });

//  app.get('/getall', (req, res) => {
//   res.type('text/plain');
//   res.send('Here are all of the books: \n\n' + books.getAll());
//  });

app.get('/add', (req,res) => {
  let result = books.add(req.query.title, req.query.author, req.query.isbn);
  res.render('details', {title: req.query.title, newlibrary: result});
 });

//  app.get('/add', (req, res) => {
//   res.type('text/plain');
//   res.send(req.query.title + ' added! Books now contains: \n\n' + books.add(req.query.title, req.query.author, req.query.isbn));
//  });

app.get('/delete', (req,res) => {
  let result = books.delete(req.query.title);
  res.render('details', {title: req.query.title, deleted: result});
 });

 app.get('/delete', (req, res) => {
  res.type('text/plain');
  res.send(books.delete(req.query.title));
 });

 // define 404 handler
 app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
 });


// http.createServer((req,res) => {
//   let url = req.url.split("?");  // separate route from query string
//   let query = qs.parse(url[1]); // convert query string to object
//   let path = url[0].toLowerCase();
//   //const path = req.url.toLowerCase();

//   switch(path) {
//     case '/':
//       fs.readFile("public/home.html", (err, data) => {
//         if (err) return console.error(err);
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(data.toString());
//       });
//       break;

//     case '/about':
//       fs.readFile("public/about.html", (err, data) => {
//         if (err) return console.error(err);
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end(data.toString());
//       });
//     break;

//     case '/get':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('Searching for: ' + query.title + '\n' + JSON.stringify(books.get(query.title)));
//       break;

//     case '/getall':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end('Here are all of the books: \n\n' + books.getAll());
//       break;

//     case '/delete':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end(books.delete(query.title));
//       break;

//     case '/add':
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.end(query.title + ' added! Books now contains: \n\n' + books.add(query.title, query.author, query.isbn));
//       break;

//     default:
//       res.writeHead(404, {'Content-Type': 'text/plain'});
//       res.end('Not found');
//       break;
//     }
// }).listen(process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('Express started'); 
 });