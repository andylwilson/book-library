let books = [
  { title:'The Last Question', author:'Isaac Asimov', isbn:1884214495},
  { title:'Watchmen', author:'Alan Moore', isbn:0930289234},
  { title:'Sonny\'s Blues', author:'James Baldwin', isbn:3125765005 },
  { title:'Batman: The Black Mirror', author:'Scott Snyder', isbn:1401232060 },
  { title:'Chronicles', author:'Bob Dylan', isbn:074324 }
  ];
  
exports.get = (requestedTitle) => {
  return books.find((item) => {
    return (item.title.toLowerCase() === requestedTitle.toLowerCase());
  });
}

exports.getAll = () => {
  return JSON.stringify(books);
}

exports.add = (newTitle, newAuthor, newIsbn) => {
  books.push({title: newTitle, author: newAuthor, isbn: newIsbn});
  return JSON.stringify(books);
}

exports.delete = (requestedTitle) => {
  let found = (books.findIndex((item) => {
    return (item.title.toLowerCase() === requestedTitle.toLowerCase());
  }));

  if (found === -1) {
    return requestedTitle + ' not removed';
  } else {
    books.splice(found,1);
    return requestedTitle + ' removed';
  }
}

