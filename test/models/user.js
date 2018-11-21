var expect = require('chai').expect
const factory = require('factory-girl')

describe('User Model', function() {
  it('Should create a user successfully', function (done) {
    factory.create('user', function (err, user) {
      expect(err).to.not.exist
      expect(user).to.exist
      expect(user.email).to.exist
      expect(user.firstName).to.exist
      expect(user.lastName).to.exist
      expect(user.password).to.exist
      done()
    })
  })

  it('Should encrypt password successfully', function (done) {
    const password = 'testpassword1'
    factory.create('user', {password: password}, function (err, user) {
      expect(err).to.not.exist
      expect(user.password).to.exist
      expect(user.password).to.not.equals(password)
      done()
    })
  })

  it('Fail if email is repeated', function (done) {
    const email = 'test@repeatedemail.com'
    factory.create('user', {email: email}, function (err, user) {
      expect(err).to.not.exist
      expect(user).to.exist
      factory.create('user', {email: email}, function (err, user) {
        expect(err).to.exist
        expect(err.code).to.equals(11000)
        done()
      })
    })
  })

  it('Fail if email is not provided', function (done) {
    factory.create('user', {email: null}, function (err, user){
      expect(err).to.exist
      expect(err.errors.email).to.exist
      expect(err.errors.email.kind).equals('required')
      done()
    })
  })

  it('Fail if password is not provided', function (done) {
    factory.create('user', {password: null}, function (err, user){
      expect(err).to.exist
      expect(err.errors.password).to.exist
      expect(err.errors.password.kind).equals('required')
      done()
    })
  })

  it('Fail if firstName is not provided', function (done) {
    factory.create('user', {firstName: null}, function (err, user){
      expect(err).to.exist
      expect(err.errors.firstName).to.exist
      expect(err.errors.firstName.kind).equals('required')
      done()
    })
  })

  it('Fail if lastName is not provided', function (done) {
    factory.create('user', {lastName: null}, function (err, user){
      expect(err).to.exist
      expect(err.errors.lastName).to.exist
      expect(err.errors.lastName.kind).equals('required')
      done()
    })
  })

  describe ('methods - comparePassword', function () {
    it('Should return true if the password provided is correct', function (done) {
      const password = 'testpassword1'
      factory.create('user', {password: password}, function (err, user) {
        expect(err).to.not.exist
        expect(user.comparePassword(password)).to.equals(true)
        done()
      })
    })

    it('Should return false if the password provided is incorrect', function (done) {
      const password = 'testpassword1'
      factory.create('user', {password: password}, function (err, user) {
        expect(err).to.not.exist
        expect(user.comparePassword(password + 'wrong')).to.equals(false)
        done()
      })
    })
  })
})
