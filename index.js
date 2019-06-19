/*
Andy Wilson / itc230 / spring 2019
Assignment 7 - Converting to SPA
*/

'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const bookMethods = require("./lib/bookMethods.js"); //import methods to access database
//const routes = require('./routes.js')(app);

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route

// *** standard routes ***

// home
app.get('/', (req, res, next) => {
  bookMethods.getAll().then((items) => {
    res.render('home', {library: JSON.stringify(items)}); 
  }).catch((err) =>{
    return next(err);
  });
});

// get one POST
app.post('/get', (req, res, next) => {
  bookMethods.getOne(req.body.title).then((item) => {
    res.render('details', {'book': item }); 
  }).catch((err) =>{
    return next(err);
  });
});

// get one GET
app.get('/get', (req, res, next) => {
  bookMethods.getOne(req.query.title).then((item) => {
    res.render('details', {'book': item }); 
  }).catch((err) =>{
    return next(err);
  });
});

// delete
app.get('/delete', (req, res, next) => {
  bookMethods.delete(req.query.title).then(() => {
    res.render('delete', {book: req.query.title}); 
  }).catch((err) =>{
    return next(err);
  });
});

// add
app.post('/add', (req, res, next) => {
  bookMethods.addOne(req.body.addTitle,req.body.addAuthor,req.body.addISBN).then((item) => {
    res.render('add', {book : item}); 
  }).catch((err) =>{
    return next(err);
  });
});

// *** api routes ***

// get all
app.get('/api/books', (req, res, next) => {
  bookMethods.getAll().then((items) => {
    res.json(items); 
  }).catch((err) =>{
    return next(err);
    });
});

// get one
app.get('/api/book/:title', (req, res, next) => {
  let title = req.params.title;
  bookMethods.getOne(title).then((item) => {
    res.json(item); 
  }).catch((err) =>{
    return next(err);
  });
});

// delete
app.get('/api/book/delete/:title', (req, res, next) => {
  let title = req.params.title;
  bookMethods.delete(title).then(() => {
   // let books = bookMethods.getAll();
    res.json({'result' : 'deleted'});
  }).catch((err) =>{
    return next(err);
  });
});

// add
app.post('/api/add', (req, res, next) => {
  bookMethods.addOne(req.body.addTitle,req.body.addAuthor,req.body.addISBN).then(() => {
    res.json({'result' : 'added / updated'}); 
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