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
      const result = books.delete("watchmen");
      expect(result).to.deep.equal({title: "watchmen", author:"alan moore", isbn:0930289234});
    });
    
    it("fails w/ invalid book", () => {
      const result = books.delete("fake");
      expect(result).to.be.undefined;
    });
   });

   describe("Books Add Method", () => {
    it("adds requested book", () => {
      const result = books.add("Fahrenheit 451", "Ray Bradbury", 0307347);
      expect(result.title).to.equal("watchmen");
    });
    
    it("fails w/ invalid book", () => {
      const result = books.add("fake");
      expect(result).to.be.undefined;
    });
   });