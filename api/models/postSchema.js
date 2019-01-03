const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },

  title: {
    type: String,
    required: [true, 'title is required...']
  },

  body: {
    type: String,
    required: [true, 'body is required...']
  },

  author: {
    type: String,
    required: [true, 'author is required...']
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Posts', postSchema);