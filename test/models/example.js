var expect = require('chai').expect
var ExampleModel = require('../../app/models/example')

describe('Example Model', function() {
  beforeEach(function(done) {    
    ExampleModel.add({ field1: 'Example 1' }, function() {
      ExampleModel.add({ field1: 'Example 2' }, function() {
        done()
      })
    })   
  })

  describe('#getAll', function () {
    it('returns all the examples', function(done) {
      ExampleModel.getAll(function(err, res) {
        expect(err).to.not.exist;
        expect(res.length).to.eq(2)
        expect(res[0].field1).to.eq('Example 1')
        expect(res[1].field1).to.eq('Example 2')
        done()
      })
    })
  })

  describe('#add', function () {
    it('adds a new example', function(done) {
      ExampleModel.getAll(function(err, res) {
        var qty = res.length;

        ExampleModel.add({ field1: 'new example' }, function(err, res) {
          expect(err).to.not.exist;
          expect(res.insertId).to.exist;
        
          ExampleModel.getAll(function(err, res) {
            expect(res.length).to.equal(qty + 1);
            done()
          });
        })
      });      
    })
  })
})
