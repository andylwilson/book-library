const expect = require("chai").expect;
const books = require("../lib/books_model");

describe("Books Get Method", () => {
    it("returns requested book", () => {
      const result = books.get("watchmen");
      expect(result).to.deep.equal({title: "Watchmen", author:"Alan Moore", isbn:0930289234});
    });
    
    it("fails w/ invalid book", () => {
      const result = books.get("fake");
      expect(result).to.be.undefined;
    });
   });

   describe("Books Delete Method", () => {
    it("deletes requested book", () => {
      const size = books.length;
      const result = books.delete("watchmen");
      expect(size).to.equal(books.length);
    });
    
    it("fails w/ invalid book", () => {
      const result = books.delete("fake");
      expect(result).to.equal(-1);
    });
   });

   describe("Books Add Method", () => {
    it("adds requested book", () => {
      books.add({title: "Calypso", author: "David Sedaris", isbn:0812367918});
      let result = books.get("calypso");
      expect(result).to.deep.equal({title: "Calypso", author: "David Sedaris", isbn:0812367918});
    });
    
    it("fails w/ invalid book", () => {
      const result = books.add({ title:'Watchmen', author:'Alan Moore', isbn:0930289234});
      expect(result).to.equal(undefined);
    });
   });