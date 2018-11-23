const factory = require('factory-girl')
const expect = require('chai').expect

describe('Author model', function (){
  it('Creates an author successfully', function (done) {
    factory.create('author', function (err, author) {
      expect(err).to.not.exist
      expect(author.firstName).to.exist
      expect(author.lastName).to.exist
      expect(author.email).to.exist
      expect(author.birthday).to.exist
      done()
    })
  })

  it('Fails if firstName is not provided', function (done) {
    factory.create('author', {firstName: null}, function (err, author) {
      expect(err).to.exist
      expect(err.errors.firstName).to.exist
      expect(err.errors.firstName.kind).to.equals('required')
      done()
    })
  })

  it('Fails if lastName is not provided', function (done) {
    factory.create('author', {lastName: null}, function (err, author) {
      expect(err).to.exist
      expect(err.errors.lastName).to.exist
      expect(err.errors.lastName.kind).to.equals('required')
      done()
    })
  })
})