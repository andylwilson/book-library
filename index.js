/*
Andy Wilson / itc230 / spring 2019
Assignment 5 - Database Integration
*/

'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const books = require('./lib/books_model.js'); //import books module to use its data and methods
const bookMethods = require("./lib/bookMethods.js"); //import methods to access database
const bookDB = require("./models/Book"); //import DB model

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

app.get('/', (req, res, next) => {
  bookMethods.getAll().then((items) => {
    res.render('home', {library: items }); 
  }).catch((err) =>{
    return next(err);
  });
});

 app.post('/get', (req, res, next) => {
  bookMethods.getOne(req.body.title).then((item) => {
    res.render('details', {'book': item }); 
  }).catch((err) =>{
    return next(err);
  });
});

app.get('/get', (req, res, next) => {
  bookMethods.getOne(req.query.title).then((item) => {
    res.render('details', {'book': item }); 
  }).catch((err) =>{
    return next(err);
  });
});

app.get('/delete', (req, res, next) => {
  bookMethods.delete(req.query.title).then(() => {
    res.render('delete', {book: req.query.title}); 
  }).catch((err) =>{
    return next(err);
  });
});

app.post('/add', (req, res, next) => {
  bookMethods.addOne(req.body.addTitle,req.body.addAuthor,req.body.addISBN).then((item) => {
    res.render('add', {book : item}); 
  }).catch((err) =>{
    return next(err);
  });
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