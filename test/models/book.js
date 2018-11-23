const factory = require('factory-girl')
const expect = require('chai').expect

describe('Book Model', function () {
  it('Creates a book successfully', function (done) {
    factory.create('author', function (err, author) {
      expect(err).to.not.exist
      expect(author).to.exist
      const input = {
        _id: author._id,
        firstName: author.firstName,
        lastName: author.lastName
      }
      factory.create('book', {author: input}, function (err, book) {
        expect(err).to.not.exist
        expect(book.isbn).to.exist
        expect(book.genres.length).to.be.at.least(1)
        expect(book.author).to.exist
        expect(book.author.firstName).to.exist
        expect(book.author.lastName).to.exist
        expect(book.author._id).to.exist
        expect(book.title).to.exist
        done()
      })
    })
  })
})