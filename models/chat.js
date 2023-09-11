const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: String,
  message: String,
  room: String,
  time: String,
});

module.exports = mongoose.model('Chat', chatSchema);