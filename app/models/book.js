const mongoose = require('mongoose')
const genres = require('../../genres')

const BookSchema = new mongoose.Schema({
  title: {type: String, required: 'Title is required.'},
  isbn: {type: String, required: 'ISBN is required.'},
  author: {
    _id: {type: mongoose.ObjectId, required: 'Author id is required'},
    firstName: {type: String, required: 'Author first name is required'},
    lastName: {type: String, required: 'Author last name is required'}
  },
  genres: [{type: String, enum: genres}]
})

module.exports = mongoose.model('Book', BookSchema)