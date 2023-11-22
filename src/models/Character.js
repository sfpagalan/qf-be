const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: String,
  age: Number,
  race: String,
  characterClass: String,
  gender: String,
  // currentStory: String,
});

module.exports = mongoose.model('Character', characterSchema);
