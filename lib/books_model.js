let books = [
  { title:'The Last Question', author:'Isaac Asimov', isbn:1884214495},
  { title:'Watchmen', author:'Alan Moore', isbn:0930289234},
  { title:'Sonny\'s Blues', author:'James Baldwin', isbn:3125765005 },
  { title:'Batman: The Black Mirror', author:'Scott Snyder', isbn:1401232060 },
  { title:'Chronicles', author:'Bob Dylan', isbn:074324 }
  ];
  
exports.get = (title) => {
  for (var i = 0; i < books.length ; i++){
    if (title === books[i].title.toLowerCase()) {
      return 'Searching for ' + title + '\n' + JSON.stringify(books[i]);
    // } else {
    //   return title + ' not found in library!';
     }
  }
}

exports.getAll = () => {
  return 'Here are all of the books: \n\n' + JSON.stringify(books);
}

exports.add = (newTitle, newAuthor, newIsbn) => {
  books.push({title: newTitle, author: newAuthor, isbn: newIsbn});
  return newTitle + ' added! Books now contains: \n\n' + JSON.stringify(books);
}

exports.delete = (title) => {
  for (var i = 0; i < books.length; i++){
    if (title === books[i].title.toLowerCase()) {
      books.splice(i,1);
      return title + ' removed. Books now contains: \n\n' + JSON.stringify(books);
    // } else {
    //   return title + ' not found in library!';
    }
  }
}

