/*
Andy Wilson / itc230 / spring 2019
Assignment 3 - Express
*/

'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const books = require('./lib/books_model.js'); //import books module to use its data and methods

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

 // send content of 'home' view
app.get('/', (req,res) => {
  res.render('home', {library: books.getAll()});
 });

 app.get('/about', (req, res) => {
  res.type('text/html');
  res.sendFile(__dirname + '/public/about.html'); 
 });

 app.get('/details', (req, res) => {
  res.type('text/html');
  res.render('details');
 });

 app.post('/get', (req,res) => {
  let result = books.get(req.body.title);
  res.render('details', {title: req.body.title, result: result });
 });

app.get('/getall', (req,res) => {
  let result = books.getAll();
  res.render('details', {allbooks: result});
 });

app.get('/add', (req,res) => {
  let result = books.add(req.query.title, req.query.author, req.query.isbn);
  res.render('details', {title: req.query.title, newlibrary: result});
 });

app.get('/delete', (req,res) => {
  let result = books.delete(req.query.title);
  res.render('delete', {title: req.query.title, result: result});
 });

 // define 404 handler
 app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
 });

app.listen(app.get('port'), () => {
  console.log('Express started'); 
 });