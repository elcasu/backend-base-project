const request = require('supertest')
const expect = require('chai').expect
const server = require('../../server')
const factory = require('factory-girl')

describe('Users Handler', function() {
  describe('POST /api/users', function () {
    var user
    var password = 'testpassword1'
    beforeEach(function (done){
      factory.build('user', function (err, u) {
        if (err) return done(err)

        user = u
        done()
      })
    })
    it('create a user successfully', function(done) {
      request(server)
      .post('/api/users')
      .send({
        email: user.email,
        password: password,
        firstName: user.firstName,
        lastName: user.lastName
      })
      .end(function(err, res) {
        expect(res.status).to.equals(201)
        expect(res.body._id).to.exist
        expect(res.body.email).to.equals(user.email)
        expect(res.body.password).to.not.exist
        expect(res.body.firstName).to.equals(user.firstName)
        expect(res.body.lastName).to.equals(user.lastName)
        done()
      })
    })
  })
})
