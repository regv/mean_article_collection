const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },

  name: {
    type: String,
    required: [true, 'name is required...']
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'email is required...']
  },

  username: {
    type: String,
    unique: true,
    required: [true, 'username is required...']
  },

  password: {
    type: String,
    required: [true, 'password is required...']
  }
});

module.exports = mongoose.model('Users', userSchema);