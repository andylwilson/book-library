const Book = require("../models/Book");

exports.getAll = () => {
  return Book.find({}, (err, result) => {
    if (err) {
      return err;
    } 
    return result;
  });
};

// return a single record
exports.getOne = (title) => {
  return Book.findOne({'title':title}, (err, item) => {
    if (err) return err;
  }); 
}

exports.delete = (title) => {
  return Book.deleteOne({'title':title}, (err, item) => {
    if (err) return err;
  }); 
}

// insert or update a single record
exports.addOne = (title, author, isbn) => {
  var newBook = {'title':title, 'author':author, 'isbn':isbn}
  Book.update({'title':title}, newBook, {upsert:true}, (err, result) => {
  if (err) return next(err);
  return {title, author, isbn};
});  

}
