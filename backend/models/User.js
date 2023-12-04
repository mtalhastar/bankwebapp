// user.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
  },
  accountType: {
    type: String,
    enum: ['savings', 'current'],
    default: 'savings',
  },
},{
  collection: 'Users',
});

module.exports = mongoose.model('User', userSchema);
