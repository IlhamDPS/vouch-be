const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  user: String,
  room: String,
});

module.exports = mongoose.model('Room', roomSchema);